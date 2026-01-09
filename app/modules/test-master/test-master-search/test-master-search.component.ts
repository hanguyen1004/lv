import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getIsDesktop, getIsTablet } from '@app/store/dialog/dialog.selectors';
import { Store } from '@ngrx/store';
import { takeUntil, Subject } from 'rxjs';

@Component({
    selector: 'app-test-master-search',
    templateUrl: './test-master-search.component.html',
    styleUrls: ['./test-master-search.component.scss']
})

export class TestMasterSearchComponent {
    isDesktop = false;
    isTablet: any = false;
    testName = ''
    testCode = '';
    errorMessage = '';
    private readonly destroy$ = new Subject<void>();

    constructor(private store: Store, private router: Router, private route: ActivatedRoute) {

        this.store.select(getIsDesktop).pipe(takeUntil(this.destroy$)).subscribe(value => {
            this.isDesktop = value;
        });

        this.store.select(getIsTablet).pipe(takeUntil(this.destroy$)).subscribe(value => {
            this.isTablet = value;
        })
    }
    onClear(): void {
        this.testName = ''
        this.testCode = ''
        this.errorMessage = '';
    }
    onSearch(): void {
        this.errorMessage = '';

        if (!this.testName.trim() && !this.testCode.trim()) {
            this.errorMessage = '* Please enter a test name or code to search!'
            return;
        }
    }
}