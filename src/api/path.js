

    const pathList = [
        {
            "title":"首頁",
            "path": import.meta.env.VITE_API_MEMBER
        },
        {
            "title":"會員服務",
            "path": import.meta.env.VITE_API_MEMBER+"MemberCenter"
        },
        {
            "title":"聯新點數",
            "path": import.meta.env.VITE_API_MEMBER+"MemberPoint"
        },
        {
            "title":"健康量測",
            "path": import.meta.env.VITE_API_MEMBER+"MemberExamine"
        },
    
    ];
    
    const qrcodeList = {
        "title":"qrcode",
        "path": import.meta.env.VITE_API_MEMBER+"qrcode/scan/True"
    };
    const Logout = {
        "title":"登出",
        "path": import.meta.env.VITE_API_MEMBER+"Login"
    };
    const Privacy = {
        "title":"隱私權聲明和服務條款",
        "path": import.meta.env.VITE_API_MEMBER+"Privacy"
    };




export default function path(){    
    return {
        pathList,
        qrcodeList,
        Logout,
        Privacy
      };
}


