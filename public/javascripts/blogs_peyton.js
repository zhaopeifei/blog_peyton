
//Enter 刷新预览；Ctrl+Enter 保存
document.getElementById('mkEditor').onkeyup = function(event){
    if(event.key === 'Enter'){
        if(!event.ctrlKey){
            document.getElementById('mkViewer').innerHTML = markdown.toHTML(this.value, 'Maruku');
        }else{
            alert('post');
    }
    }  
};

document.getElementById('save').onclick = function(event){
    if(!window.XMLHttpRequest){
        alert('浏览器不支持XMLHttpRequest。换句话说，浏览器太low了，换个吧~');
        return;
    }

    var blog = {
        category: document.getElementById('category').value,
        title: document.getElementById('title').value,
        content: document.getElementById('mkEditor').value,
    };

    var xhr = new XMLHttpRequest();
    if(document.getElementById('id').value){
        xhr.open('PUT', '/blogs/peyton', true);
        blog.id = document.getElementById('id').value;
    }else{
        xhr.open('POST', '/blogs/peyton', true);
    }
    
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4) {
            if((xhr.status === 200)){
                alert(xhr.responseText);
            }else if(xhr.status === 400){
                alert(xhr.responseText);
            }else{
                alert('出现未知错误');
            }
        }
    };

    //要修改请求内容类型，这样后端才能解析
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify(blog));
};