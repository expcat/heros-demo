import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// 路由
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
// 内存数据模拟
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from '@svc/in-memory-data.service';

import { DelonMockModule } from '@delon/mock';
// Mock数据规则文件地址
import * as MOCKDATA from '../../_mock';
// 只对开发环境有效
import { environment } from '../environments/environment';
const MOCKMODULE = !environment.production
  ? // data: any = null Mock 数据规则
    // delay: number = 300 请求延迟，单位：毫秒
    // force: boolean = false 是否强制所有请求都Mock
    //                  `true` 表示当请求的URL不存在时直接返回 404 错误
    //                  `false` 表示未命中时发送真实HTTP请求
    // log: boolean = true 是否打印 Mock 请求信息
    // executeOtherInterceptors: boolean = true
    //      是否拦截命中后继续调用后续拦截器的`intercept` 方法
    [DelonMockModule.forRoot({ data: MOCKDATA, force: false })]
  : [];

@NgModule({
  // 可声明对象
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent
  ],
  // 导出
  exports: [],
  // 导入
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // 内存数据模拟
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
    //   dataEncapsulation: false
    // }),
    // Mock数据
    MOCKMODULE
  ],
  // 服务提供者
  providers: [],
  // 引导入口
  bootstrap: [AppComponent]
})
export class AppModule {}
