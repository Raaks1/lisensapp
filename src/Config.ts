const config = {
 appId: '101b8ac5-ff79-4528-926f-13683c0196e4',
  /* appId: 'cb854d0b-f426-480f-8e6d-6bfba838b6b4',*/
  
    
  /*  tenantID:'653549de-3049-4012-8bff-4dea40ec7ac7',*/
 /* authority: 'https://login.microsoftonline.com/lisensid.tofsandbox.onmicrosoft.com',*/
   /* redirectUri: 'http://localhost:3000',*/
  /* redirectUri: 'https://o365licenses.azurewebsites.net/.auth/login/aad/callback',*/
    scopes: [
      'User.Read.All', 'User.ReadWrite.All', 'Directory.Read.All', 'Directory.ReadWrite.All'
      
      
    ]
  };
  

  
export default config;