import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { UserDetailComponent } from './user-detail.component'
import { LoaderService } from 'src/app/modules/loader/services/loader.service'
import { RoleService } from 'src/app/modules/role/services/role.service'
import { Role } from 'src/app/modules/role/models/role.model'
import { Observable, of } from 'rxjs'
import { MessageService } from 'src/app/modules/message/services/message.service'
import { Router } from '@angular/router'
import { ChangeDetectorRef } from '@angular/core'
import {
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatIconModule,
    MatInputModule,
} from '@angular/material'
import { ReactiveFormsModule } from '@angular/forms'
import { ImageUploadComponent } from 'src/app/modules/image/components/image-upload/image-upload.component'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Permission } from 'src/app/modules/role/models/permission.model'
import { User } from '../../models/user.model'
import { Image } from 'src/app/modules/image/models/image.model'

describe('UserDetailComponent', () => {
    let component: UserDetailComponent
    let fixture: ComponentFixture<UserDetailComponent>

    const loaderServiceSpy = jasmine.createSpyObj('LoaderService', [
        'changeLoader',
    ])
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl'])
    const locationSpy = jasmine.createSpyObj('Location', ['go', 'back'])
    const messageServiceSpy = jasmine.createSpyObj('MessageService', [
        'createMessage',
    ])
    const cdRefSpy = jasmine.createSpyObj('ChangeDetectorRef', [
        'detectChanges',
    ])

    const roleServiceStub: Partial<RoleService> = {
        getRoles(): Observable<Role[]> {
            const roles: Role[] = [
                { id: '1', name: 'ADMIN' },
                { id: '2', name: 'READER' },
            ]
            return of(roles)
        },
    }

    const permission: Permission = {
        id: 'p_1',
        name: 'adminDefault',
        description: 'adminDefault',
    }

    const role: Role = {
        id: 'r_1',
        name: 'ADMIN',
        permissions: [permission],
    }

    const image: Image = {
        name: 'userImage_1',
        mimeType: 'image/png',
        source: 'userImage_1.png',
    }
    const user: User = {
        id: 'u_1',
        username: 'max',
        password: 'sterne123',
        email: 'max@mustermann.de',
        role: role,
        img: image,
    }

    const onSubmitFunc = () => of('hallo')

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserDetailComponent, ImageUploadComponent],
            providers: [
                { provide: LoaderService, useValue: loaderServiceSpy },
                { provide: MessageService, useValue: messageServiceSpy },
                { provide: Location, useValue: locationSpy },
                { provide: ChangeDetectorRef, useValue: cdRefSpy },
                { provide: RoleService, useValue: roleServiceStub },
            ],
            imports: [
                MatFormFieldModule,
                ReactiveFormsModule,
                MatCardModule,
                MatSelectModule,
                MatSlideToggleModule,
                MatIconModule,
                RouterTestingModule,
                MatInputModule,
                BrowserAnimationsModule,
            ],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(UserDetailComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('create component', () => {
        component.user = user
        component.userImageUrl = user.img.source
        component.routeBack = '/user-admin'

        fixture.detectChanges()
        expect(component).toBeTruthy()
    })
})
