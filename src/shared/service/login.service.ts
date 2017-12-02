import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { WarpperService } from './warpper.service';
import { UserService } from './user.service';
import { ChartsService } from './charts.service';

@Injectable()
export class LoginService {

    // 保存用户登录信息
    user: any;

    ref: any;

    constructor(
        private authService: AuthService,
        private warpperService: WarpperService,
        private userService: UserService,
        private chartsService: ChartsService
    ){
        this.ref = this.authService.LinkWilddog();

        // 保存用户登录信息
        this.user = JSON.parse(localStorage.getItem('KA-U'));

    }

    /*****
    *  各服务中写入用户数据
    *  @param  :  (参数)
    *  @return :  (返回值说明)
    *****/
    serviceSetUserData(user) {
        this.userService.user = user;
        this.warpperService.user = user;
        this.chartsService.user = user;
        this.user = user;
    }
    /*****
    *  登陆判断
    *  @param  :  (参数)
    *  @return :  (返回值说明)
    *****/
    login(param) {
        const ref = this.ref;
        const lid = 'U102400' + param.phone;
        return new Promise((resolve) => {
            ref.child('Keep-Accounts').child('user').child(lid).once('value',(res)=>{
                // 当这个 callback 为 null 的时候才能进行注册
                if (res.val() === null){
                    resolve({
                        state: 404,
                        error: '用户名不存在'
                    });
                }else {
                    // 再请求一次用户数据，返回注册用户.
                    ref.child('Keep-Accounts').child('user').child(lid).once('value',(ref)=>{
                        if (ref.val()['password'] === param.password) {
                            resolve({
                                state: 200,
                                data: ref.val()
                            });
                        }else {
                            resolve({
                                state: 400,
                                error: '密码错误，请重新输入'
                            });
                        }
                    });
                }
            });
        });
    }

    /*****
    *  注册事件
    *  @param  :  (参数)
    *  @return :  (返回值说明)
    *****/
    register(form) {
        const ref = this.ref;

        return new Promise((resolve) => {
            ref.child('KP-ID').child('User-ID').transaction(function(currentValue) {
                let newValue = (currentValue||0) + 1;
                return newValue;
            }, function(err, committed, ss) {
                if( err ) {
                    resolve(err)
                }
                else if( committed ) {

                    const lid = 'U102400' + form.phone;

                    // 返回的状态码 400 200
                    ref.child('Keep-Accounts').child('user').child(lid).once('value',(res)=>{
                        // 当这个 callback 为 null 的时候才能进行注册
                        if (res.val() === null){
                            ref.child('Keep-Accounts').child('user').child(lid).set({
                                id: lid,
                                phone: form.phone,
                                name: form.name,
                                password: form.password,
                                date: form.date,
                                sumPrice: 0
                            });
                            // 再请求一次用户数据，返回注册用户.
                            ref.child('Keep-Accounts').child('user').child(lid).once('value',(ref)=>{
                                resolve({
                                    state: 200,
                                    data: ref.val()
                                });
                            });
                        }else {
                            resolve({
                                state: 400,
                                error: '用户名已存在'
                            });
                        }
                    });
                }
            });
        });

    }

}