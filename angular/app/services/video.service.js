"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
require("rxjs/add/operator/map");
let VideoService = class VideoService {
    constructor(_http) {
        this._http = _http;
        this.url = "http://localhost/curso-fullstack/web/app_dev.php";
    }
    create(token, video) {
        let json = JSON.stringify(video);
        let params = "json=" + json + "&authorization=" + token;
        let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/video/new", params, { headers: headers }).map(res => res.json());
    }
    getVideo(id) {
        return this._http.get(this.url + "/video/detail/" + id).map(res => res.json());
    }
};
VideoService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], VideoService);
exports.VideoService = VideoService;
//# sourceMappingURL=video.service.js.map