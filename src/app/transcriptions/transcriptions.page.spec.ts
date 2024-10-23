import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranscriptionsPage } from './transcriptions.page';

describe('TranscriptionsPage', () => {
  let component: TranscriptionsPage;
  let fixture: ComponentFixture<TranscriptionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscriptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
