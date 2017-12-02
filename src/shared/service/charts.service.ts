import { Injectable } from '@angular/core';
import * as wilddog from 'wilddog';

import { AuthService } from './auth.service';

@Injectable()
export class ChartsService {
    // 创建 wilddog 链接
    ref: any;
    // 保存当前用户
    user: any;

    constructor(
        private authService: AuthService,
    ) {
        // 创建 wilddog 链接
        this.ref = this.authService.LinkWilddog();

    }

}