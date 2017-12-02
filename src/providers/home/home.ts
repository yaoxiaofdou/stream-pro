import { Injectable } from '@angular/core';

@Injectable()
export class HomeProvider {

  // 可选择的颜色列表
  appColorList = [
    { id: 'col1001',color: '#FFFFCC',label:'阳光'},{id: 'col1002',color: '#CCFFFF',label:'天空'},
    { id: 'col1003',color: '#9999CC',label:'紫霞'},{id: 'col1004',color: '#FFCC99',label:'泥泞'},
    { id: 'col1005',color: '#CCFF99',label:'校草'},{id: 'col1006',color: '#CCFFCC',label:'嫩牙'},
    { id: 'col1007',color: '#99CCFF',label:'笔蓝'},{id: 'col1008',color: '#FF9999',label:'玫瑰'},
    { id: 'col1009',color: '#CCFF00',label:'青涩'},{id: 'col1010',color: '#CCCC99',label:'水泥'},
    { id: 'col1011',color: '#EFCEE8',label:'少女'},{id: 'col1012',color: '#F3D7B5',label:'清肤'},
    { id: 'col1013',color: '#FDFFDF',label:'光芒'},{id: 'col1014',color: '#DAF9CA',label:'野草'},
    { id: 'col1015',color: '#DFB5B7',label:'阿西'}
  ];

  // 新建分类的图标种类.
  appClassIcon = [
    { id: 'i1001',icon: 'icon-book',label:'书籍'},{ id: 'i1002',icon: 'icon-fumu',label:'父母'},
    { id: 'i1003',icon: 'icon-shejiao',label:'社交'},{ id: 'i1004',icon: 'icon-nv',label:'女朋友'},
    { id: 'i1005',icon: 'icon-nan',label:'男朋友'},{ id: 'i1006',icon: 'icon-zinvqingkuang',label:'子女'},
    { id: 'i1007',icon: 'icon-tongxin',label:'通讯'},{ id: 'i1008',icon: 'icon-yinliao',label:'饮料'},
    { id: 'i1009',icon: 'icon-shuiguo',label:'水果'},{ id: 'i1010',icon: 'icon-fuzhuang',label:'女装'},
    { id: 'i1011',icon: 'icon-chixiu',label:'餐食'},{ id: 'i1012',icon: 'icon-lingshi',label:'零食'},
    { id: 'i1013',icon: 'icon-7',label:'早餐'},{ id: 'i1014',icon: 'icon-lvyou',label:'旅游'},
    { id: 'i1015',icon: 'icon-yexiao',label:'夜宵'},{ id: 'i1016',icon: 'icon-wucan',label:'午餐'},
    { id: 'i1017',icon: 'icon-yule',label:'娱乐'},{ id: 'i1018',icon: 'icon-wancan',label:'晚餐'},
    { id: 'i1019',icon: 'icon-3',label:'交通'},{ id: 'i1020',icon: 'icon-iconupload',label:'购物'},
    { id: 'i1021',icon: 'icon-icon',label:'男装'}
  ];

  constructor() {
    console.log('Hello HomeProvider Provider');
  }

}
