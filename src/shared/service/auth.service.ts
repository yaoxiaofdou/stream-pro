import { Injectable } from '@angular/core';
import * as wilddog from 'wilddog';

@Injectable()
export class AuthService {
    // 创建 wilddog 链接
    LinkWilddog() {
        // const config = {
        // authDomain: "wd0192174156wkjrix.wilddogio.com",
        // syncURL: "https://wd0192174156wkjrix.wilddogio.com"
        // };
        // wilddog.initializeApp(config);
        // const ref = wilddog.sync().ref();
        let ref;
        return ref
    }

}