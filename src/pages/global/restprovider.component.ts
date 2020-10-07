import { Injectable } from  '@angular/core';

import { HttpClient, HttpHeaders } from  '@angular/common/http';

import  'rxjs/add/operator/catch';

import  'rxjs/add/operator/map';

@Injectable()

export  class  RestProvider {
    err:any;
    baseUrl:string = "http://localhost:9999/thetatelugu";
    httpOptions:any={
        heaeders:new HttpHeaders({"Content-Type":"application/json"})
    }
    constructor(private  httpClient : HttpClient) { 
       
    
    }
    
    
    public  getTeluguMatalu(){
        return this.httpClient.get(this.baseUrl+'/getTeluguMatalu/',this.httpOptions);
    }

    

    public  saveTeluguMata(teluguMata){
        console.log(teluguMata);
        const headers = new HttpHeaders({'Content-Type':'application/json','Accept': 'application/json'});
        return this.httpClient.post(this.baseUrl+'/createTeluguMata',teluguMata,{headers});
        
    }

    public  updateTeluguMata(teluguMata){
        const headers = new HttpHeaders({'Content-Type':'application/json','Accept': 'application/json'});
        return this.httpClient.post(this.baseUrl+'/updateTeluguMata/',teluguMata,{headers});
    }
    public  deleteTeluguMata(teluguMata) {

        const headers = new HttpHeaders({'Content-Type':'application/json','Accept': 'application/json'});
        return this.httpClient.post(this.baseUrl+'/deleteTeluguMata/',teluguMata,{headers});
    }

    public  getTeluguMata(teluguMata) {

        const headers = new HttpHeaders({'Content-Type':'application/json','Accept': 'application/json'});
        return this.httpClient.post(this.baseUrl+'/getTeluguMata/',teluguMata,{headers});
    }
    public  login(user) {

        const headers = new HttpHeaders({'Content-Type':'application/json','Accept': 'application/json'});
        return this.httpClient.post(this.baseUrl+'/getUser/',user,{headers});
    }



    public  saveUser(user){
        console.log(user);
        const headers = new HttpHeaders({'Content-Type':'application/json','Accept': 'application/json'});
        return this.httpClient.post(this.baseUrl+'/createUser',user,{headers});
        
    }

    public  updateUser(user){
        const headers = new HttpHeaders({'Content-Type':'application/json','Accept': 'application/json'});
        return this.httpClient.post(this.baseUrl+'/updateUser/',user,{headers});
    }
    public  deleteUser(user) {

        const headers = new HttpHeaders({'Content-Type':'application/json','Accept': 'application/json'});
        return this.httpClient.post(this.baseUrl+'/deleteUser/',user,{headers});
    }

    public  getUser(user) {

        const headers = new HttpHeaders({'Content-Type':'application/json','Accept': 'application/json'});
        return this.httpClient.post(this.baseUrl+'/getUser/',user,{headers});
    }
 
    public  getUsers(){
        return this.httpClient.get(this.baseUrl+'/getUsers/',this.httpOptions);
    }

    
    
}