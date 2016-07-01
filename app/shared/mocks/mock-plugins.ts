import {IPlugin} from "../models/plugin";

export var PLUGINS: IPlugin[] = [
    {id: 1, name: "Blogs", url: "./app/dashboard/plugins/blog/", author: "Adrian & Yoel", enabled: true},
    {id: 2, name: "New Plugin", url: "./app/dashboard/core/users/", author: "Adrian & Yoel", enabled: false},
    // {id: 3, name: "Classifieds", url: "./app/dashboard/plugins/classifieds/", author: "Kmilo", enabled: false},
    // {id: 4, name: "Videos", url: "./app/dashboard/plugins/videos/", author: "Dariam", enabled: false},
    // {id: 5, name: "Images", url: "./app/dashboard/core/images/", author: "Alberto", enabled: false},
];


