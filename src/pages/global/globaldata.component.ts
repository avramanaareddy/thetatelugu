import { Injectable } from '@angular/core';
@Injectable()
export class Globaldata {


    constructor() {

    }

    fontSize: number = 18;
    pincodes: any = [];
    dynamicMenu: any = null;
    user: any;
    pages: any;
    menuEnabled:any=false;
    ratings: any = [
        {
          rtCode: '1',
          rtDesc: 'ఒకటి'
        },
        {
          rtCode: '2',
          rtDesc: 'రెండు'
        },
        {
          rtCode: '3',
          rtDesc: 'మూడు'
        },
        {
          rtCode: '4',
          rtDesc: 'నాలుగు'
        },
        {
          rtCode: '5',
          rtDesc: 'ఐదు'
        },
        {
          rtCode: '6',
          rtDesc: 'ఆరు'
        },
        {
          rtCode: '7',
          rtDesc: 'ఏడు'
        },
        {
          rtCode: '8',
          rtDesc: 'ఎనిమిది'
        },
        {
          rtCode: '9',
          rtDesc: 'తొమ్మిది'
        },
        {
          rtCode: '10',
          rtDesc: 'పది'
        },
      ]; 
    
      mulamulu: any = [
        {
          mCode: 'తె',
          mDesc: 'తెలుగు'
        },
        {
          mCode: 'త',
          mDesc: 'తమిళము'
        },
        {
          mCode: 'క',
          mDesc: 'కన్నడ'
        },
        {
          mCode: 'హి',
          mDesc: 'హిందీ'
        },
        {
          mCode: 'స',
          mDesc: 'సంస్కృతము'
        },
        {
          mCode: 'ఉ',
          mDesc: 'ఉర్దు'
        },
        {
          mCode: 'ఆం',
          mDesc: 'ఇంగ్లీష్'
        },
        {
          mCode: 'ఇ',
          mDesc: 'ఇతర పెఱ నుడి'
        }
        
      ]




}