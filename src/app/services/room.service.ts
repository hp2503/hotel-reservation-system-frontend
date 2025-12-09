import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ApiResponse, Room, OccupancySummary } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = `${environment.apiUrl}/rooms`;

  constructor(private http: HttpClient) {}

  /**
   * Initialize all rooms
   */
  initializeRooms(): Observable<ApiResponse<{ message: string; count: number }>> {
    return this.http.post<ApiResponse<{ message: string; count: number }>>(
      `${this.apiUrl}/initialize`,
      {}
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Get all rooms
   */
  getAllRooms(floor?: number, isBooked?: boolean): Observable<ApiResponse<{ count: number; rooms: Room[] }>> {
    let params: any = {};
    if (floor !== undefined) params.floor = floor.toString();
    if (isBooked !== undefined) params.isBooked = isBooked.toString();

    return this.http.get<ApiResponse<{ count: number; rooms: Room[] }>>(
      this.apiUrl,
      { params }
    ).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  /**
   * Get available rooms
   */
  getAvailableRooms(): Observable<ApiResponse<{ count: number; rooms: Room[] }>> {
    return this.http.get<ApiResponse<{ count: number; rooms: Room[] }>>(
      `${this.apiUrl}/available`
    ).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  /**
   * Get rooms by floor
   */
  getRoomsByFloor(floor: number): Observable<ApiResponse<{ floor: number; count: number; rooms: Room[] }>> {
    return this.http.get<ApiResponse<{ floor: number; count: number; rooms: Room[] }>>(
      `${this.apiUrl}/floor/${floor}`
    ).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  /**
   * Get room by number
   */
  getRoomByNumber(roomNumber: number): Observable<ApiResponse<{ room: Room }>> {
    return this.http.get<ApiResponse<{ room: Room }>>(
      `${this.apiUrl}/${roomNumber}`
    ).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  /**
   * Get occupancy summary
   */
  getOccupancySummary(): Observable<ApiResponse<OccupancySummary>> {
    return this.http.get<ApiResponse<OccupancySummary>>(
      `${this.apiUrl}/occupancy/summary`
    ).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = error.error?.error || error.message || 'Server error';
    }

    console.error('RoomService Error:', errorMessage);
    return throwError(() => error);
  }
}