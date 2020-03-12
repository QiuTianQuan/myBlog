let format = require('date-format');

export const getPathName = props=>props.location&&props.location.pathname&&props.location.pathname.substring(1);

export const formatTime = time=>{
    let date = new Date(time*1000);
    return format.asString('yyyy-MM-dd hh:mm', date)
}

export const getHtml = str =>{
    return str? str.replace(/@quot;|@apos;/g,function(str){
        if(str==='@quot;'){
            return '"'
        }else if(str==="@apos;") {
            return "'"
        }
    }):null
}

export const getArticleInfo = detailArr=>{
    let {...rest}=detailArr&&detailArr[0]?detailArr[0]:{};
    return rest
}