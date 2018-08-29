import {Injectable, Injector} from '@angular/core';
import {
    HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse,
    HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent,
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators';
import {mergeMap} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import * as _ from 'lodash';

import {EnvironmentConfig} from "../config/config";
import {NativeService} from "../../providers/native.service";


class Pagination {
    count: number;
    currentPage: number;
    nextPage: number;
    prevPage: number;
}

export class Meta {
    pagination = new Pagination();
}


export interface IResponse {
    status: boolean;
    result: any;
    meta?: Meta
}


/**
 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
    constructor(
        private config: EnvironmentConfig,
        private nativeService: NativeService,
        private injector: Injector
    ) {
    }


    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {


        // 统一加上服务端前缀
        let url = req.url;
        if (!url.startsWith('https://') && !url.startsWith('http://') && !url.startsWith('./assets/i18n/')) {
            url = this.config.apiEndPoint + url;
        }

        const update = {
            url
        };

        // const auth = this.injector.get(Auth);
        //
        // // 添加token
        // if (auth.isAuthenticated()) _.assign(update, {setHeaders: {Authorization: 'JWT ' + localStorage.getItem('access_token')}});
        // if (auth.isAuthenticated() && !_.isNil(localStorage.getItem('team')) && req.method === 'GET') _.assign(update, {setParams: {teamId: localStorage.getItem('team')}});


        const newReq = req.clone(update);


        return next.handle(newReq).pipe(
            mergeMap((event: any) => {
                // 若一切都正常，则后续操作
                return of(event);
            }),
            catchError((res: HttpErrorResponse) => {
                // 清除错误
                const toast: any = this.nativeService.showToast(res.error.message);
                // toast.onDidDismiss(()=>{
                if (res.error.code === 11000) {
                    // auth.logout();
                    // auth.returnRoot();
                }
                // })

                // 返回错误
                return ErrorObservable.create(res);
            })
        );
    }
}
