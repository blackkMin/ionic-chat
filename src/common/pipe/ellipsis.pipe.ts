import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {
    constructor() {
    }

    transform(name: string, hasType: boolean, type?: string, length ?: number): string {
        if (type) {
            if (name.length > length) {
                let result: string;
                result = this.filter(name);
                return result.slice(0, length) + '...';
            } else {
                return name;
            }
        } else {
            if (name.length > 10) {
                if (hasType) {
                    return name.slice(0, 6) + '...' + name.slice(name.lastIndexOf('.') + 1);
                }
                return name.slice(0, 9) + '...';
            } else {
                return name;
            }
        }

    }

    filter(name: string): string {
        const imgReg = /<img[^>]*src[=\'\"\s]+([^\"\']*)[\"\']?[^>]*>/gi;
        const str = name.match(imgReg);
        _.forEach(str, (item: any) => {
            name =  name.replace(item, '');
            name = name.replace('<p></p>', '');
        });
        // const reg = /<(.*)\s(.*)>/;
        // const arr = reg.exec(name);
        // while (!_.isNull(arr)) {
        //   name = name.replace(`/<${arr[1]}\s(.*)>/g`, '<${arr[1]}>')
        // }
        // const reg_h = /<h[1-6]>/g;
        // name = name.replace(reg_h, '<p>');
        // name = name.replace(/<\/h[1-6]>/g, '</p>');
        return name;
    }
}


