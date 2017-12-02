import { Injectable } from '@angular/core';

@Injectable()
export class FunctionService {

    /*****
    *  格式化 对象 为 数组  
    *  @param  :  (参数)
    *  @return :  (返回值说明)
    *****/
    clearObjToArray(obj) {
        let arr = [];
        for (let i in obj) {
            if (obj[i].name) {
                obj[i].value = obj[i].name;
                obj[i].label = obj[i].name;
            }
            if (obj[i].content) {
                obj[i].value = obj[i].content;
                obj[i].label = obj[i].content;
            }
            arr.push(obj[i]);
        }
        return arr;
    }

}