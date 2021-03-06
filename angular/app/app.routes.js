"use strict";
const router_1 = require('@angular/router');
const login_component_1 = require("./components/login.component");
const default_component_1 = require("./components/default.component");
const register_component_1 = require("./components/register.component");
const user_edit_component_1 = require("./components/user.edit.component");
const video_new_component_1 = require("./components/video.new.component");
const video_detail_component_1 = require("./components/video.detail.component");
exports.routes = [
    {
        path: '',
        redirectTo: '/index',
        terminal: true
    },
    { path: 'index', component: default_component_1.DefaultComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'login/:id', component: login_component_1.LoginComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'user-edit', component: user_edit_component_1.UserEditComponent },
    { path: 'create-video', component: video_new_component_1.VideoNewComponent },
    { path: 'video/:id', component: video_detail_component_1.VideoDetailComponent },
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.routes)
];
//# sourceMappingURL=app.routes.js.map