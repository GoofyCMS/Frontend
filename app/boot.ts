/// <reference path="../typings/breeze/breeze.d.ts" />

// Cargando Angular Dependencies
import {provide} from "@angular/core";
import {bootstrap} from "@angular/platform-browser-dynamic";
import {HTTP_PROVIDERS, Http} from "@angular/http";
import {ROUTER_PROVIDERS} from "@angular/router-deprecated";
import {enableProdMode} from '@angular/core';

// load obs libs
import {Observable} from "rxjs/observable";
import "rxjs/add/operator/map";

// Cargando Servicios Compartidos por la aplicacion
import {AUTH_PROVIDERS, AuthService} from "./shared/services/auth.service";
import {EventAggregator} from "./shared/services/event-aggregator";
import {UnitOfWorkFactory} from "./shared/services/unitofwork";
import {HttpService} from "./shared/services/http-service";
import {Logger} from "./shared/resources/logger";
import {FormlyProviders} from "./shared/auto-forms/services/formly.providers";
import {FormlyBootstrap} from "./shared/auto-forms/templates/formlyBootstrap";

// cargando componente principal de la aplicacion
import {GoofyAppComponent} from "./goofy.app.component";

// Angular-Breeze Q polyfill
(function (breeze) {

    function _classCallCheck(instance, constructor) {
        if (!(instance instanceof constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Q = (function () {
        function Q() {
            _classCallCheck(this, Q);

            this.defer = function () {
                return new Deferred();
            };
            this.resolve = function (data) {
                return Promise.resolve(data);
            };
            this.reject = function (reason) {
                return Promise.reject(reason);
            };
        }

        return new Q();
    })();

    var Deferred = function Deferred() {
        _classCallCheck(this, Deferred);

        var self = this;
        this.promise = new Promise(function (resolve, reject) {
            self.resolve = resolve;
            self.reject = reject;
        });
    };

    breeze.config.setQ(Q);

})(breeze);


let modules: string[] = [];
let eventAggregator: EventAggregator = new EventAggregator();
let logger: Logger = new Logger();
logger.logInfo(null, "Get metadata from modules", modules, this);
let factory: UnitOfWorkFactory = new UnitOfWorkFactory(logger, eventAggregator);

// buscando los metadatos correspondientes al componente de administration
factory.configure(["administration"])
    .then(a => {
        factory.getContext("administration")
            .getRepository("PluginItem")
            .getAll()
            .then(b => {
                b.results.forEach(plugin => {
                    if (plugin.enabled)
                        modules.push(plugin.name.toLowerCase())
                })
            })
            .then(c => {
                factory.configure(modules)
                    .then(response => {

                        logger.logInfo("Success", "Modules loaded", response, factory);

                        let providers: any[] = [
                            HTTP_PROVIDERS,
                            ROUTER_PROVIDERS,
                            AuthService,
                            AUTH_PROVIDERS,
                            provide(Logger, {useValue: logger}),
                            provide(UnitOfWorkFactory, {useValue: factory}),
                            provide(EventAggregator, {useValue: new EventAggregator()}),
                            HttpService,
                            FormlyBootstrap,
                            FormlyProviders,
                        ];
                        for (var module of modules) {
                            providers.push(provide(module + ".UnitOfWork", {
                                useFactory: () => factory.getContext(module),
                            }));
                        }

                        bootstrap(GoofyAppComponent, providers)
                            .then(() => logger.logSuccess(null, "GoofyApp Bootstrapped", null, this, true))
                            .catch(error => logger.logError("Error!", "Error Boostraping GoofyApp", error, this, true));
                    })
                    .catch(error => logger.logError("Error!", "Error Loading Modules", error, this, true));
            })
    });





