import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecordVoicePage } from './record-voice.page';

describe('RecordVoicePage', () => {
  let component: RecordVoicePage;
  let fixture: ComponentFixture<RecordVoicePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordVoicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
