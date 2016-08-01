(function(){
    var hrefBase = "https://codepen.io/peytonzhao/full/";
    var profiles = [
        { 
            srcUrl: '/sources/simon.jpg', 
            name: 'Simon Game', 
            description: '', 
            href: hrefBase+''
        },{ 
            srcUrl: '/sources/TicTacToe.jpg', 
            name: 'TicTacToe Game', 
            description: '', 
            href: hrefBase+''
        },{ 
            srcUrl: '/sources/Timer.jpg', 
            name: '番茄时钟', 
            description: '', 
            href: hrefBase+''
        },{ 
            srcUrl: '/sources/Calculator.jpg', 
            name: '计算器', 
            description: '', 
            href: hrefBase + ''
        },{ 
            srcUrl: '/sources/WikiViwer.jpg', 
            name: '维基词条搜索工具', 
            description: '', 
            href: hrefBase+''
        },{ 
            srcUrl: '/sources/TwitchApp.jpg', 
            name: 'Twitch主播查看器', 
            description: '', 
            href: hrefBase+''
        }
    ];

    var fragement = document.createDocumentFragment();
    profiles.forEach(function(profile){
        
        var figure = document.createElement('figure');

        var img = document.createElement('img');
        img.setAttribute("src",profile.srcUrl);
        figure.appendChild(img);
          
        var name = document.createTextNode(profile.name);
        var figcaption = document.createElement('figcaption');
        figcaption.appendChild(name);
        figure.appendChild(figcaption);

        var description = document.createTextNode(profile.description);
        var p = document.createElement('p');
        p.appendChild(description);
        figure.appendChild(p);

        var link = document.createElement('a');
        link.setAttribute('href',profile.hrefUrl);
        link.appendChild(figure);

        fragement.appendChild(link);
    });

    document.getElementById('profileContainer').appendChild(fragement);
})();