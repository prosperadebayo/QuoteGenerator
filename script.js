// Get The Elements By Id
 const qouteContainer = document.getElementById('quote-container');
 const quoteText = document.getElementById('quote');
 const authorText = document.getElementById('author');
 const twitterBtn = document.getElementById('twitter')
 const newQouteBtn = document.getElementById('new-quote');   
 const loader = document.getElementById('loader');
 

//Show Loading
    function loading(){
        loader.hidden = false;
        qouteContainer.hidden = true;
    }
    

    //hideLoading
    function complete(){
        loader.hidden = true;
        qouteContainer.hidden = false;
    }

//  Show New Quote
    function newQoute(){
        loading()
        // Pick a random quote from api quote array 
        const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
        // check if quote doesnt have an author
        if(!quote.author){
            authorText.textContent = 'Uknown author'
        } else{
             authorText.textContent = quote.author;
        }  
        //Check the Quote length to determine styling
        if(quote.text.length > 50){
            quoteText.classList.add('long-quote')
        }else{
            quoteText.classList.remove('long-qoute')
        }
        
        quoteText.textContent = quote.text;
        setTimeout(()=> complete(), 500)
        

        


    }
    
   // Get Quotes from Api    
    async function getQuotes(){
        loading();
        const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
        try {
            const response = await fetch(apiUrl);
            apiQuotes = await response.json();
            // invoked the newQoute function inside here when theres is 
            newQoute()
            tweetQoute()
        } catch (error) {
            // Catch Error Here
            
        }
    }
    
    // On Load
    getQuotes()
    // Tweet Qoute
    function tweetQoute(){
        const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
        window.open(twitterUrl,'_blank');
    }
    // Event Listeners
    function btn(tweet=twitterBtn,nextQuote=newQouteBtn) {

        tweet.addEventListener('click',tweetQoute);
        nextQuote.addEventListener('click',newQoute);
    }
    btn()


  