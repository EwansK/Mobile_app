import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranscriptionModalPage } from './transcription-modal.page';

describe('TranscriptionModalPage', () => {
  let component: TranscriptionModalPage;
  let fixture: ComponentFixture<TranscriptionModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscriptionModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
