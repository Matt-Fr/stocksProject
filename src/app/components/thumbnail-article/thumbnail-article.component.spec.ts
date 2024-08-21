import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailArticleComponent } from './thumbnail-article.component';

describe('ThumbnailArticleComponent', () => {
  let component: ThumbnailArticleComponent;
  let fixture: ComponentFixture<ThumbnailArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThumbnailArticleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThumbnailArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
