class ApiFeatures {

    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr
    }

    //function of class ApiFeatures
    search(){
        const keyword=this.queryStr.keyword?
        {
            //we want pattern jese kuch word dikhe toh woh show ho jaye
            name:{
                //regex is used to match a word out of it
                $regex:this.queryStr.keyword,
                $options:"i",//caseinsensitive either I or i
            },
        

        }://if the keyword property does not exist in the queryStr object, an empty object 
        //is assigned to the keyword variable.
        {}
this.query=this.query.find({...keyword});
return this;
//we have returned this- meaning returned the full class
    }


    
    //function of class ApiFeatures
    filter(){
        //making copy 
        const queryCopy={...this.queryStr}
        //removing some fields for category
        const removeFields=['keyword','page','limit'];
        removeFields.forEach(key=>delete queryCopy[key]);

        //filter for price and Rating

        let queryStr=JSON.stringify(queryCopy);
        queryStr=queryStr.replace(/\b(gt|get|lt|lte)\b/g,key=>`$${key}`);

        console.log(queryStr);
        this.query=this.query.find(JSON.parse(queryStr));
        return this;
    }

//view of products in pages
    
    pagination(resultPerPage){
        const currentPage= Number(this.queryStr.page) || 1; 
 
        const skip=resultPerPage*(currentPage-1);

        this.query= this.query.limit(resultPerPage).skip(skip);
        return this;
    }
};
module.exports=ApiFeatures;