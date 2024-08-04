import axios from 'axios';
export const fetchTemperature = async (cityName: string, startDate: string, endDate: string): Promise<any> => {
    const token = localStorage.getItem("Token")
    try {
        
        const response = await axios.get<any>(`/weather/protected/temperature/${cityName}/${startDate}/${endDate}`,
        {headers:{
            Authorization: `Bearer ${token}`
         }
         });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch temperature data');
    }
};
 






/*

export const fetchTemperature = async (cityName: string, startDate: string, endDate: string) => {

    const response = (await axios.get(`http://localhost:8000/public`)
    , { headers: {"Authorization" : `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJHTjM2bU5hdE5xT2p6LXl6enViZG5FdUc5WEdyMEZ2SU9UTWtpTl94YWhzIn0.eyJleHAiOjE3MTQzNTExNTksImlhdCI6MTcxNDM1MDg1OSwianRpIjoiY2Y5MThjOWItZjlmOC00NjMyLWIzNGEtYTgzNGFlMTQ3ZGFlIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy93ZWF0aGVyIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjQ1ZjY1YTFjLTBhNmQtNDJiZi04ODU5LTgwNjI3ZTU3NzRlMSIsInR5cCI6IkJlYXJlciIsImF6cCI6Im15Y2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjhlMTYxYjcxLTJjOTQtNGYyNy05YTE3LTdmMmFiZjQ2NjIwMSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXdlYXRoZXIiLCJvZmZsaW5lX2FjY2VzcyIsImFkbWluIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4ZTE2MWI3MS0yYzk0LTRmMjctOWExNy03ZjJhYmY0NjYyMDEiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJ6YWhyYSBjaGFyYW5hIiwicHJlZmVycmVkX3VzZXJuYW1lIjoidGVzdCIsImdpdmVuX25hbWUiOiJ6YWhyYSIsImZhbWlseV9uYW1lIjoiY2hhcmFuYSIsImVtYWlsIjoiY2hhcmFuYXphaHJhQGdtYWlsLmNvbSJ9.c_99bj2beXcq4LWESPftXmehvVrVvvwlpUAvbH8lR2K8G6TOLtXGzIdZhW5Ji1Mo1ZUiIn0zihrJsnMJyFvcLzpRSLLEFYbUbCp4EiSpVC-HtpKcWSf56K7M59UML99RTczRMCv4EZKHg51m3ApTbqCfKbU4aGrOh-_uHOSsdzvKbU1Bg0yOXZjyDtGR4bM9d0QH-_E4T5TAaUl-_obIn0tYyoVWkHnlHGiJe5eUqsG6ENH3qaaqVC754P4-KeTbMThAhCs2nnF-8Q5JlwmLp9QD_7kGjN8CP1WqJIYMyzwoQtENKYWMzdcnU2_Quafegcaf9WSGAWLMRSBe2au03g`} })

    console.log(response);
}
*/