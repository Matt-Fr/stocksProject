import { TestBed } from '@angular/core/testing';

import { SavedArticlesService } from './saved-articles.service';

describe('SavedArticlesService', () => {
  let service: SavedArticlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavedArticlesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
