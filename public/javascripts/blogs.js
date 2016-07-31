
(function(){
    var ajax = (function(){
        var request = function(method, value, path, success, failure){
            if(!window.XMLHttpRequest){
                alert('浏览器不支持XMLHttpRequest。换句话说，浏览器太low了，换个吧~');
                return;
            }

            var xhr = new XMLHttpRequest();

            xhr.open(method, path, true);

            xhr.onreadystatechange = function(){
                if (xhr.readyState === 4) {
                    if((xhr.status === 200)){
                        if(success){
                            success(JSON.parse(xhr.responseText));
                        }
                    }else{
                        if(failure){
                            failure(JSON.parse(xhr.responseText));
                        }
                    }
                }
            };

            //要修改请求内容类型，这样后端才能解析
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhr.send(JSON.stringify(value));
        };
        return {
            get: function(path, success, failure){
                request('get', null, path, success, failure);  
            },
            post: function(value, path, success, failure){
                request('post', value, path, success, failure);
            },
            put: function(value, path, success, failure){
                request('put', value, path, success, failure);
            },
            delete: function(value, path, success, failure){
                request('delete', value, path, success, failure);
            }
        };
    })();

    var km = window.km = new kityminder.Minder();
    km.setup('#minder-view');
    km.disable();

    var pushBlogs = function(blogs){
        var blogsContainer = document.getElementById('blogsContainer');
        blogsContainer.style.display = 'none';

        var blogsHtml = '';

        blogs.forEach(function(blog){
            var html = '<div class="blog-container"><article>' + marked(blog.content) + '</article></div>';
            blogsHtml += html;
        });

        blogsContainer.innerHTML = blogsHtml;
        blogsContainer.style.display = 'block';
    };

    km.on('selectionchange',function(){
        if(!km.getSelectedNodes().length){
            return;
        }

        ajax.get('/blogs/blog?category='+km.getSelectedNodes()[0].data.text, 
            function(res){
                pushBlogs(res);
            },function(res){
                alert(res.show);
            });
    });
})();
