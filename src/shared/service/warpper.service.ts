import { Injectable } from '@angular/core';
import * as wilddog from 'wilddog';

import { AuthService } from './auth.service';
// import { Router } from '@angular/router';

@Injectable()
export class WarpperService {

    // 创建 wilddog 链接
    ref: any;
    // 当前登陆用户
    user: any;

    constructor(
        private authService: AuthService,
        // private router: Router
    ) {
        // 创建 wilddog 链接
        this.ref = this.authService.LinkWilddog();

        this.user = JSON.parse(localStorage.getItem('KA-U'));
        // if (!this.user){
        //     this.router.navigateByUrl('/login');
        // }

    }

    public years: Array<Object> = [];
    public month: Array<Object> = [];
    public day: Array<Object> = [];
    public devent: Array<Object> = [];

    /*****
    *  返回 年 数据
    *  @param  :  (参数)
    *  @return :  (返回值说明)
    *****/
    getYearsData(): any {
        // 返回跟录入要设个限定 ～ 最大不能超过当前日期
        // 链接野狗数据库
        const ref = this.ref;

        return new Promise((resolve) => {
            ref.child('Keep-Accounts').child('Years').child(this.user['id']).once('value').then((snapshot)=>{
                this.years = snapshot.val();
                resolve(this.years);
            });
        });
    }

    /*****
    *  返回 月 数据
    *  @param  :  (参数)
    *  @return :  (返回值说明)
    *****/
    getMonthData(id):any {
        // 链接野狗数据库
        const ref = this.ref; 

        return new Promise((resolve)=>{
            ref.child('Keep-Accounts').child('Month').child(this.user['id']).child(id).once('value').then((snapshot)=>{
                this.month = snapshot.val();
                resolve(this.month)
            })
        })
    }

    /*****
    *  返回 具体 活动数据
    *  @param  :  (参数)
    *  @return :  (返回值说明)
    *****/
    getDayData(id):any {
        // 链接野狗数据库
        const ref = this.ref; 
        
        return new Promise((resolve)=>{
            ref.child('Keep-Accounts').child('Day').child(this.user['id']).child(id).once('value').then((snapshot)=>{
                this.day = snapshot.val();
                resolve(this.day)
            })
        })
    }

    /*****
    *  返回 具体 花费事件
    *  @param  :  (参数)
    *  @return :  (返回值说明)
    *****/
    getEventData(id):any {
        
        // 链接野狗数据库
        const ref = this.ref; 
        
        return new Promise((resolve)=>{
            ref.child('Keep-Accounts').child('Event').child(this.user['id']).child(id).once('value').then((snapshot)=>{
                this.devent = snapshot.val();
                resolve(this.devent)
            })
        })
    }

    /*****
    *  数据写入 云端后台
    *  @param  :  (参数)
    *  @return :  (返回值说明)
    *****/
    setEventData(_event): any {

        const user = this.user;

        // 链接野狗数据库
        const ref = this.ref;

        const evt = {
            cid: _event.cid,
            class: _event.class,
            content: _event.content,
            price: _event.price,
            year: _event.year,
            month: _event.month,
            date: _event.date,
            hours: _event.hours,
            minu: _event.minu,
            secod: _event.secod
        }

        return new Promise((resolve)=>{
            // 每个用户有个属于自己的用户id
            ref.child('KP-ID').child(this.user['id']).child('Y-ID').transaction(function(currentValue) {
                let newValue = (currentValue||0) + 1;
                return newValue;
            }, function(err, committed, ss) {
                if ( err ) {
                    resolve(err)
                }else if ( committed ) {
                    // 更新用户消费总价
                    ref.child('Keep-Accounts').child('user').child(user['id']).child('sumPrice').once('value',(res)=>{
                        const pr = res.val();
                        // user 总消费数据更新
                        ref.child('Keep-Accounts').child('user').child(user['id']).update({
                            'sumPrice' : pr + evt.price
                        });
                    });

                    // 处理 years start
                    // 如果counter加1成功，那么写入数据。
                    let yearsId = 'Y102400'+ evt.year;  // 这里可以拿到自增后的id
                    
                    // 先获取当前的总数，再累加
                    ref.child('Keep-Accounts').child('Years').child(user['id']).child(evt.year).child('sum').once('value',(res)=>{
                        let pr = res.val();
                        // years 写入数据库
                        ref.child('Keep-Accounts').child('Years').child(user['id']).child(evt.year).set({
                            id: yearsId,
                            name: evt.year,
                            sum: pr + evt.price
                        });
                    });

                    // 处理 years end

                    // 处理 month start
                    let monthId = 'M102400'+ evt.year + evt.month;  // 这里可以拿到自增后的id
                    
                    // month 写入数据库
                    ref.child('Keep-Accounts').child('Month').child(user['id']).child(yearsId).child(evt.month).child('sum').once('value',(res)=>{
                        let pr = res.val();
                        ref.child('Keep-Accounts').child('Month').child(user['id']).child(yearsId).child(evt.month).set({
                            id: monthId,
                            name: evt.month,
                            sum: pr + evt.price
                        });
                    });
                    
                    // 处理 month end

                    // 处理 day start
                    let dayId = 'D102400'+ evt.year + evt.month + evt.date;  // 这里可以拿到自增后的id

                    // day 写入数据库
                    ref.child('Keep-Accounts').child('Day').child(user['id']).child(monthId).child(evt.date).child('sum').once('value',(res)=>{
                        let pr = res.val();
                        ref.child('Keep-Accounts').child('Day').child(user['id']).child(monthId).child(evt.date).set({
                            id: dayId,
                            name: evt.date,
                            sum: pr + evt.price
                        });
                    })
                    // 处理 day end

                    // 处理 event start
                    let eventId = 'E102400'+ evt.year + evt.month + evt.date + ss.val();  // 这里可以拿到自增后的id

                    const ka_event = {
                        id: eventId,
                        date: evt.year +'-'+ evt.month +'-'+ evt.date +' '+ evt.hours+':'+evt.minu+':'+evt.secod,
                        content: evt.content,
                        price: evt.price
                    };

                    // event 写入数据库
                    ref.child('Keep-Accounts').child('Event').child(user['id']).child(dayId).child(eventId).set(ka_event);
                    // 处理 event end


                    /************   class   ************/

                    // 这里需要添加具体分类的代码
                    ref.child('Keep-Accounts').child('Class').child(user['id']).child(evt.cid).child('sum').once('value',(res)=>{
                        const sm = res.val();

                        ref.child('Keep-Accounts').child('Class').child(user['id']).child(evt.cid).child('count').once('value',(cnt)=>{
                            const ct = cnt.val();

                            ref.child('Keep-Accounts').child('Class').child(user['id']).child(evt.cid).set({
                                id: evt.cid,
                                name: evt.class,
                                count: ct + 1,
                                sum: sm + evt.price    // 总价
                            });

                        });
                    });

                    ref.child('Keep-Accounts').child('ClassDetail').child(user['id']).child(evt.cid).child('children').child(eventId).set(ka_event);

                    // 分类里的 年 数据集合
                    ref.child('Keep-Accounts').child('ClassDetail').child(user['id']).child(evt.cid).child('Years').child(evt.year).child('sum').once('value',(res)=>{
                        let pr = res.val();
                        // years 写入数据库
                        ref.child('Keep-Accounts').child('ClassDetail').child(user['id']).child(evt.cid).child('Years').child(evt.year).set({
                            id: yearsId,
                            name: evt.year,
                            sum: pr + evt.price
                        });
                    });

                    // 分类里的 月 数据集合
                    ref.child('Keep-Accounts').child('ClassDetail').child(user['id']).child(evt.cid).child('Month').child(yearsId).child(evt.month).child('sum').once('value',(res)=>{
                        let pr = res.val();
                        ref.child('Keep-Accounts').child('ClassDetail').child(user['id']).child(evt.cid).child('Month').child(yearsId).child(evt.month).set({
                            id: monthId,
                            name: evt.month,
                            sum: pr + evt.price
                        });
                    });

                    // 分类里的 日 数据集合
                    ref.child('Keep-Accounts').child('ClassDetail').child(user['id']).child(evt.cid).child('Day').child(monthId).child(evt.date).child('sum').once('value',(res)=>{
                        let pr = res.val();
                        ref.child('Keep-Accounts').child('ClassDetail').child(user['id']).child(evt.cid).child('Day').child(monthId).child(evt.date).set({
                            id: dayId,
                            name: evt.date,
                            sum: pr + evt.price
                        });
                    });

                    // 分类里的 事件 数据集合
                    ref.child('Keep-Accounts').child('ClassDetail').child(user['id']).child(evt.cid).child('Event').child(dayId).child(eventId).set(ka_event);

                    resolve(200);

                }
            });
        })
    }

}