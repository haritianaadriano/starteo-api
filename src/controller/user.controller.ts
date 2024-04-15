import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { UserMapper } from "./mapper/user.mapper";
import { AuthGuard } from "../auth/guards/auth.guards";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { UserApi } from "./api/user.rest";
import { PaginationQuery } from "./queries/pagination.query";

@Controller('users')
export class UserController{
    constructor(
        private readonly userService: UserService,
        private readonly userMapper: UserMapper
    ) {}

    @UseGuards(AuthGuard)
    @Get()
    @ApiCreatedResponse({
        description: 'Users found',
        type: UserApi,
        isArray: true
    })
    @ApiTags('users')
    async findUsers(@Query() paginationQuery: PaginationQuery): Promise<UserApi[]> {
        const users = await this.userService.findUsers(paginationQuery);
        const mappedUsers = await Promise.all(users.map((user) => 
        this.userMapper.fromDomainToRest(user)));
        return mappedUsers;
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    @ApiCreatedResponse({
        description: 'User found',
        type: UserApi
    })
    @ApiTags('users')
    async findUserById(@Param() id: string): Promise<UserApi> {
        const user = await this.userService.findById(id);
        const mappedUser = this.userMapper.fromDomainToRest(user);
        return mappedUser;
    }
}