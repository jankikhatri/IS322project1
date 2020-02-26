(function () {
    var mockDatabase = [
        { _id: '1', title: 'Oscar', price: '50', img: './img/cat-1.jpg', category:'black-and-white'},
        { _id: '2', title: 'Smokey', price: '55', img: './img/cat-2.jpg', category:'black-and-white'},
        { _id: '3', title: 'Sassy', price: '20', img: './img/cat-3.jpg', category:'colors'},
        { _id: '4', title: 'Gizmo', price: '13', img: './img/cat-4.jpg', category:'black-and-white'},
        { _id: '5', title: 'Spike', price: '33', img: './img/cat-5.jpg', category:'colors'},
        { _id: '6', title: 'Precious', price: '75', img: './img/cat-6.jpg', category:'black-and-white'},
        { _id: '7', title: 'Buddy', price: '10', img: './img/cat-7.jpg', category:'colors'},
        { _id: '8', title: 'Sylvester', price: '20', img: './img/cat-8.jpg', category:'black-and-white'},
        { _id: '9', title: 'Simba', price: '17', img: './img/cat-9.jpg', category:'colors'},
    ];
    function getInfo(results){
        var listInfos = results.map(function(result,index){
            return(
                '<p class="product_info">'+result.title+'</p>'
            )
        });
        return listInfos;
    }
    function getPrice(results){
        var listPrices = results.map(function(result,index){
            return(
                '<p class="product_price">'+'$'+result.price+'</p'
            )
        });
        return listPrices;
    }

    function getImg(results){
        var listImgs = results.map(function(result,index){
            return(
                "<img class='product_img' src='"+result.img+"'>"
            )
        });
        return listImgs;
    }

    function renderList (results) {
        var info = getInfo(results);
        var img = getImg(results);
        var price = getPrice(results);
        var i;

        var list = document.getElementsByClassName("list-container")[0];
        list.innerHTML='';

        for (i=0;i<info.length;i++){
            var card = document.createElement("div");
            card.className = "card";
            list.appendChild(card);

            var getCardImg = document.createElement("div");
            getCardImg.className="card-img-top";
            card.appendChild(getCardImg);

            var cardInfo = document.createElement("p");
            cardInfo.className ="card-text";
            card.appendChild(cardInfo);

            var getCardInfo = document.createElement("h5");
            getCardInfo.className="card-title";
            cardInfo.appendChild(getCardInfo);

            var getCardPrice = document.createElement("p");
            getCardPrice.className="card-text";
            cardInfo.appendChild(getCardPrice);

            getCardImg.innerHTML+=img[i];
            getCardInfo.innerHTML+=info[i];
            getCardPrice.innerHTML+=price[i];
        }

    }
    document.getElementsByClassName("list-container")[0].addEventListener("load",renderList(mockDatabase));

    function orderBy(sortValue) {
        var sortedResults = (sortValue === 'title') ?
            mockDatabase.sort(function (a, b) {
                var nameA = a.title.toUpperCase();
                var nameB = b.title.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
            }) :
            mockDatabase.sort(function (a, b) {
                return a[sortValue] - b[sortValue];
            });
        renderList(sortedResults);
    }

    document.querySelector('#orderBy').addEventListener('change', function(event){
        orderBy(event.target.value);
    });


    function toggleCategory(showCategory) {
        var filteredResults = mockDatabase.filter(function(result) {
            return result.category==showCategory;
        });
        renderList(filteredResults);
    }

    document.querySelector('#category').addEventListener('change', function(event){
        var value = event.target.value;
        toggleCategory(value);
    });

    function togglePriceRange(showPrice){
        if (showPrice==='30'){
            var filteredResults = mockDatabase.filter(function(result){
                return result.price <=30;
            });
        }
        else{
            var filteredResults = mockDatabase.filter(function(result){
                return result.price >30;
            });
        }
        return renderList(filteredResults);

    }
    document.querySelector('#priceRange').addEventListener('change', function(event){
        var value = event.target.value;
        togglePriceRange(value);
    });
})();
