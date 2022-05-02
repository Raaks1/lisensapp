const config = {
  
   appId: 'cb854d0b-f426-480f-8e6d-6bfba838b6b4',
   /* appId: 'd716fca3-c1d6-42ed-ae28-4b60e36263f1',*/
    
   /* tenant:'653549de-3049-4012-8bff-4dea40ec7ac7',
  Authority: 'https://login.microsoftonline.com/{cb854d0b-f426-480f-8e6d-6bfba838b6b4?tenantId=653549de-3049-4012-8bff-4dea40ec7ac7}/v2.0',*/
    redirectUri: 'http://localhost:3000',
    scopes: [
      'User.Read.All', 'User.ReadWrite.All', 'Directory.Read.All', 'Directory.ReadWrite.All'
      
      
    ]
  };
  

  
export default config;