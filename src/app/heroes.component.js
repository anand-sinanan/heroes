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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var hero_service_1 = require("./hero.service");
var animations_1 = require("@angular/animations");
var HeroesComponent = (function () {
    function HeroesComponent(heroService, router) {
        this.heroService = heroService;
        this.router = router;
    }
    HeroesComponent.prototype.getHeroes = function () {
        var _this = this;
        this.heroService.getHeroes().then(function (heroes) { return _this.heroes = heroes; });
    };
    HeroesComponent.prototype.ngOnInit = function () {
        this.getHeroes();
    };
    HeroesComponent.prototype.toggleState = function (hero) {
        hero.state = (hero.state === 'active' ? 'inactive' : 'active');
    };
    HeroesComponent.prototype.onSelect = function (hero) {
        this.selectedHero = hero;
    };
    HeroesComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/detail', this.selectedHero.id]);
    };
    HeroesComponent.prototype.add = function (name) {
        var _this = this;
        name = name.trim();
        if (!name) {
            return;
        }
        this.heroService.create(name)
            .then(function (hero) {
            _this.heroes.push(hero);
            _this.selectedHero = null;
        });
    };
    HeroesComponent.prototype.delete = function (hero) {
        var _this = this;
        this.heroService
            .delete(hero.id)
            .then(function () {
            _this.heroes = _this.heroes.filter(function (h) { return h !== hero; });
            if (_this.selectedHero === hero) {
                _this.selectedHero = null;
            }
        });
    };
    return HeroesComponent;
}());
HeroesComponent = __decorate([
    core_1.Component({
        selector: 'my-heroes',
        templateUrl: './heroes.component.html',
        styleUrls: [
            './heroes.component.css'
        ],
        providers: [
            hero_service_1.HeroService,
        ],
        animations: [
            animations_1.trigger('heroState', [
                animations_1.state('inactive', animations_1.style({
                    backgroundColor: '#eee',
                    transform: 'scale(1)'
                })),
                animations_1.state('active', animations_1.style({
                    backgroundColor: '#cfd8dc',
                    transform: 'scale(1.1)'
                })),
                animations_1.transition('inactive => active', animations_1.animate('100ms ease-in')),
                animations_1.transition('active => inactive', animations_1.animate('100ms ease-out'))
            ]),
            animations_1.trigger('flyInOut', [
                animations_1.state('in', animations_1.style({ width: 120, transform: 'translateX(0)', opacity: 1 })),
                animations_1.transition('void => *', [
                    animations_1.style({ width: 10, transform: 'translateX(50px)', opacity: 0 }),
                    animations_1.group([
                        animations_1.animate('0.3s 0.1s ease', animations_1.style({
                            transform: 'translateX(0)',
                            width: 120
                        })),
                        animations_1.animate('0.3s ease', animations_1.style({
                            opacity: 1
                        }))
                    ])
                ]),
                animations_1.transition('* => void', [
                    animations_1.group([
                        animations_1.animate('0.3s ease', animations_1.style({
                            transform: 'translateX(50px)',
                            width: 10
                        })),
                        animations_1.animate('0.3s 0.2s ease', animations_1.style({
                            opacity: 0
                        }))
                    ])
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [hero_service_1.HeroService,
        router_1.Router])
], HeroesComponent);
exports.HeroesComponent = HeroesComponent;
//# sourceMappingURL=heroes.component.js.map