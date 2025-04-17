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
exports.Device = void 0;
const typeorm_1 = require("typeorm");
let Device = class Device {
};
exports.Device = Device;
__decorate([
    (0, typeorm_1.PrimaryColumn)({
        name: 'id',
        type: 'bigint',
        nullable: false,
        generated: true,
    }),
    __metadata("design:type", Number)
], Device.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'client_id',
        type: 'bigint',
        nullable: true,
        generated: false,
    }),
    __metadata("design:type", Number)
], Device.prototype, "client_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'mac_address',
        type: 'varchar',
        length: 15,
        unique: true,
        nullable: false,
        generated: false,
    }),
    __metadata("design:type", String)
], Device.prototype, "mac_address", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'code',
        type: 'varchar',
        length: 4,
        nullable: false,
        generated: false,
    }),
    __metadata("design:type", String)
], Device.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'code_expiry',
        type: 'timestamptz',
        nullable: false,
        generated: false,
    }),
    __metadata("design:type", String)
], Device.prototype, "code_expiry", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamptz',
        nullable: false,
        generated: true,
        default: 'now()',
    }),
    __metadata("design:type", Date)
], Device.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updated_at',
        type: 'timestamptz',
        nullable: false,
        generated: true,
        default: 'now()',
    }),
    __metadata("design:type", Date)
], Device.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'deleted_at',
        type: 'timestamptz',
        nullable: true,
    }),
    __metadata("design:type", Date)
], Device.prototype, "deleted_at", void 0);
exports.Device = Device = __decorate([
    (0, typeorm_1.Entity)({
        name: 'device',
    })
], Device);
//# sourceMappingURL=device.entity.js.map