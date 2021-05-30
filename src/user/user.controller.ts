import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

	constructor(private readonly userService: UserService){}

	@Post('/create')
	async createUserController(@Body() createUser: CreateUserDto){
		const user = await this.userService.checkUser(createUser.email);
		let result = {
			msg: '',
			status:false,
		};
		
		if(!user.id){
			const createResult = await this.userService.createUser(createUser.email, createUser.password);
			if(createResult.lastID){
				result = {
					status: true,
					msg: "Пользователь успешно создан.",
				};
			} else {
				result = {
					status: false,
					msg: "Ошибка создания пользователя. Попробуй те позже.",
				};
			}
		} else {
			result = {
				status: false,
				msg: "Такой пользователь уже существует.",
			};
		}

		return JSON.stringify(result);
	}

	@Post()
	async loginController(@Body() getUser: GetUserDto){
		const user = await this.userService.checkUser(getUser.email);
		let result = {
			user: {},
			status:false,
			result:{},
		};
		if(user){
			const passIsRight = await this.userService.checkHashPassword(getUser.password, user);
			if(passIsRight){
				result.user = {
					id: user.id,
					email: user.email,
				};
				result.status = true;
			} else {
				result.result = {
					msg: 'Проверьте введённые данные.',
					status: false,
				}
			}
			
		} else {
			result.result = {
				msg: 'Пользователь не найден.',
				status: false,
			}
		}

		return JSON.stringify(result);
	}
	
}