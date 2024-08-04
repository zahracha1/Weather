import { useState } from 'react';
import { useMutation, useQuery, UseMutationResult, UseQueryResult, QueryFunctionContext } from 'react-query';

// Types for the process data
interface ProcessData {
  process_id: string;
}

interface ProcessProgress {
  status: string;
}

// Function types for startProcess and getProgress
async function startProcess(): Promise<ProcessData> {
  // Mock function to simulate starting a process
  return { process_id: '123' };
}

async function getProgress(context: QueryFunctionContext<[string, string | null]>): Promise<ProcessProgress> {
  const { queryKey } = context;
  const processId = queryKey[1];
  
  if (processId) {
    // Mock function to simulate fetching process progress
    return { status: 'finished' };
  } else {
    throw new Error('Process ID is null');
  }
}

// Custom hook to handle process with polling
const useProcessInterval = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  const [processId, setProcessId] = useState<string | null>(null);
  const [stop, setStop] = useState<boolean>(false);

  // Function to handle successful process start
  const handleProcessStartSuccess = (data: ProcessData) => {
    setProcessId(data.process_id);
  };

  // Function to handle errors
  const handleError = (error: unknown, message: string) => {
    console.error(message, error);
    setStop(true);
    setProcessId(null);
    onError();
  };

  // Mutation to start the process
  const { mutate }: UseMutationResult<ProcessData, unknown, void> = useMutation(startProcess, {
    onMutate: () => {
      setStop(false);
    },
    onError: (error) => handleError(error, 'Error starting process'),
    onSuccess: handleProcessStartSuccess,
  });

  // Fetch process status until it's finished
  const { isLoading, data }: UseQueryResult<ProcessProgress, unknown> = useQuery(
    ['processProgress', processId] as [string, string | null],
    getProgress,
    {
      onSuccess: (data) => {
        if (data.status === 'finished') {
          setStop(true);
          setProcessId(null);
          onSuccess();
        }
      },
      onError: (error) => handleError(error, 'Error fetching process status'),
      enabled: processId != null,
      refetchInterval: stop ? false : 5000,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: false,
    }
  );

  return { mutate, data, isLoading };
};

export default useProcessInterval;
