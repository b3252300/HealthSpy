import { encryptStorage } from "@/store/EncryptStorage.js";
import {  Validation  } from '@/api/user';
import { watch, onMounted } from 'vue';



export default function useToken() {

    const tokenApi = (params)=>{
  
          Validation(params)
          .then((res) => {
              const { code, data } = res;
              if(code == 0){
                // const Token = data.Token;             
                  // watch(Token, ()=>{
                  //   encryptStorage.setItem("Token", Token);
                  // });
              }else{

              }
            //   console.log(res, "tokenApi");
            
          });
    }
    return { tokenApi }

}



