/// <reference path="../../../typings/systemjs/systemjs.d.ts" />
import {Component, DynamicComponentLoader, Injector, Inject, bind, Type, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';

export function componentProxyFactory(path: string): Type {
    @Component({
        selector: 'component-proxy',
        bindings: [bind('path').toValue(path)],
        template: `<span #content></span>`
    })
    class VirtualComponent {
        @ViewChild('content') content;

        constructor(el: ElementRef, loader: DynamicComponentLoader, inj: Injector, @Inject('path')path: string) {
            System.import(path)
                .then(m => {
                    let exportClass = Object.getOwnPropertyNames(m).filter(p => typeof m[p] === 'function')[0];
                    loader.loadNextToLocation(m[exportClass], this.content);
                });
        }
    }
    return VirtualComponent;
}
