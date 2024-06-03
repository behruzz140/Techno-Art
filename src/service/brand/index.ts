import request from "../config"

// ----------------> Interface Services Brand <-------------------------------------
export interface postData{
    brand_name: string;
    brand_description: string;
    position:number|string;
    image:string;
}

export interface UpdateData{
    id:number|undefined;
    putData: postData;
}


interface Brand{
    post : (data:postData)=> any,
    delete : (id:number)=> any,
    get : ()=> any,
    update : (data:UpdateData)=> any,
}

// ---------> Interface Store Brand <--------------------
export interface StoreBrand {
    isLoader:boolean;
    dataBrands:any[];
    totlCount:number;
    getBrand: ()=> Promise <any>;
    postBrand: (data:postData)=> Promise <any>;
    deleteBrand: (id:number)=> Promise <any>;
    updateBrand: (data:UpdateData)=> Promise <any>;
}




// ----------------> Instance Brand <----------------------------
export const brand:Brand = {
    post: (data)=> request.post("/brand/create" , data),
    delete: (id)=> request.delete(`/brand/delete/${id}`),
    get: ()=> request.get(`/brand/get-all/q`),
    update: (data)=> request.put(`/brand/update/${data.id}`, data.putData)
}