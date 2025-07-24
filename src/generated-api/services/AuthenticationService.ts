/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserRequest } from '../models/CreateUserRequest';
import type { LoginRequest } from '../models/LoginRequest';
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthenticationService {
    /**
     * Register a new user
     * @param requestBody
     * @returns User User successfully registered
     * @throws ApiError
     */
    public static registerUser(
        requestBody: CreateUserRequest,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Login a user
     * @param requestBody
     * @returns User Login successful
     * @throws ApiError
     */
    public static loginUser(
        requestBody: LoginRequest,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Check if user is authenticated and return user info
     * @returns User User is authenticated
     * @throws ApiError
     */
    public static checkAuth(): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/auth/check-auth',
        });
    }
    /**
     * Logout the user
     * @returns any Successfully logged out
     * @throws ApiError
     */
    public static logoutUser(): CancelablePromise<{
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/logout',
        });
    }
}
