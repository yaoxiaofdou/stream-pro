import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
// import { Router } from '@angular/router';

@Injectable()
export class UserService {

    // 对所有数据进行大数据处理---处理
    // 所有消费均分为以下几类
    // 吃喝：早餐，午餐，晚餐，零食，下午茶，夜宵，饮料，水果
    // 玩耍：娱乐，社交，旅游，
    // 提升：书籍，网课，请教，
    // 日常：公交，家常，打车，

    // 为了能匹配每一个类目：ID进行统一划分
    // 一级：A102400 + ' '
    // 二级：Y102400 + 一级 +  ' '
    // 三级：M102400 + 一级 + 二级 + ' '
    // 四级：D102400 + 一级 + 二级 + 三级 + ' '
    // 五级：E102400 + 一级 + 二级 + 三级 + 四级 + ' '

    ref: any  = '';

    // 当前登陆用户
    user: any;

    years: any = [];
    month: any = [];
    day: any = [];
    _evnt: any = [];


    constructor(
        private authService: AuthService,
        // private router: Router
    ) {
        this.ref = this.authService.LinkWilddog();

        this.user = JSON.parse(localStorage.getItem('KA-U'));
        // if (!this.user){
        //     this.router.navigateByUrl('/login');
        // }
    }

    /*****
    *  Create class 
    *  @param  :  (参数)
    *  @return :  (返回值说明)
    *****/
    CreateClass(cls) {

        const user = this.user;
        const ref = this.ref;

        const nc = {
            icon: cls.icon,
            color: cls.color,
            name: cls.name
        };

        return new Promise((resolve) => {
            ref.child('KP-ID').child(user['id']).child('C-ID').transaction(function(currentValue) {
                const newValue = (currentValue || 0) + 1;
                return newValue;
            }, function(err, committed, ss) {
                if ( err ) {
                    resolve(err);
                }else if ( committed ) {
                    // 这里可以拿到自增后的id
                    const classId = 'A102400' + ss.val();

                    // 详细数据分开存储，因为将来detail的数据可能会很大，要做到按需加载.
                    ref.child('Keep-Accounts').child('Class').child(user['id']).child(classId).set({
                        id: classId,
                        color: nc.color,
                        icon: nc.icon,
                        name: nc.name, // 类名
                        count: 0, // 分类 数据 总数
                        sum: 0    // 总价
                    });
                    // 分开存储的detail数据
                    ref.child('Keep-Accounts').child('ClassDetail').child(user['id']).child(classId).set({
                        id: classId,
                        icon: nc.icon,
                        color: nc.color,
                        name: nc.name, // 类名
                        children: '123', // 分类数据列表
                    });

                    // 请求一次数据库，返回数据
                    ref.child('Keep-Accounts').child('Class').child(user['id']).once('value',(res)=>{
                        let call = {};
                        call['state'] = 200;
                        call['data'] = res.val();
                        resolve(call);
                    });
                }
            });
        });
    }

    /*****
    *  获取当前所有的分类数据
    *  @param  :  (参数)
    *  @return :  (返回值说明)
    *****/
    getClassAll() {

        const ref = this.ref;
        return new Promise((resolve) => {
            ref.child('Keep-Accounts').child('Class').child(this.user['id']).once('value',(res) => {
                const val = res.val();
                resolve(val);
            });
        });

    }

    /*****
    *  获取当前分类列表数据
    *  @param  :  (参数)
    *  @return :  (返回值说明)
    *****/
    getClassDetail(cls) {
        const ref = this.ref;

        const param = cls;

        return new Promise((resolve) => {
            ref.child('Keep-Accounts').child('ClassDetail').child(this.user['id']).child(param.id).once('value',(res) => {
                const val = res.val();
                resolve(val);
            });
        });

    }

    /*****
    *   获取当前分类列表数据 年
    *  @param  :  (参数)
    *  @return :  (返回值说明)
    *****/
    getClassDetailYears(cls) {
        const ref = this.ref;

        const param = cls;
        return new Promise((resolve)=>{
            ref.child('Keep-Accounts').child('ClassDetail').child(this.user['id']).child(param).child('Years').once('value').then((snapshot)=>{
                this.years = snapshot.val();
                resolve(this.years);
            });
        });
    }

    /*****
    *   获取当前分类列表数据 月
    *  @param  :  (参数)
    *  @return :  (返回值说明)
    *****/
    getClassDetailMonth(cls, yid) {
        const ref = this.ref;

        const param = cls;
        return new Promise((resolve)=>{
            ref.child('Keep-Accounts').child('ClassDetail').child(this.user['id']).child(param).child('Month').child(yid).once('value').then((snapshot)=>{
                this.month = snapshot.val();
                resolve(this.month);
            });
        });
    }

    /*****
    *   获取当前分类列表数据 月
    *  @param  :  (参数)
    *  @return :  (返回值说明)
    *****/
    getClassDetailDay(cls, mid) {
        const ref = this.ref;

        const param = cls;
        return new Promise((resolve)=>{
            ref.child('Keep-Accounts').child('ClassDetail').child(this.user['id']).child(param).child('Day').child(mid).once('value').then((snapshot)=>{
                this.day = snapshot.val();
                resolve(this.day);
            });
        });
    }

    /*****
    *   获取当前分类列表数据 事件
    *  @param  :  (参数)
    *  @return :  (返回值说明)
    *****/
    getClassDetailEvent(cls, did) {
        const ref = this.ref;

        const param = cls;
        return new Promise((resolve) => {
            ref.child('Keep-Accounts').child('ClassDetail').child(this.user['id']).child(param).child('Event').child(did).once('value').then((snapshot)=>{
                this._evnt = snapshot.val();
                resolve(this._evnt);
            });
        });
    }

}