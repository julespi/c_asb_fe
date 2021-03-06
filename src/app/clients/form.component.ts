import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from './client';
import { ClientService } from './client.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  public client: Client = new Client();
  public title: string = 'Create new client';
  public errors: string[];

  constructor(
    private clientService: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadClient();
  }

  loadClient(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.clientService
          .getClient(id)
          .subscribe((client) => (this.client = client));
      }
    });
  }

  public create(): void {
    this.clientService.createClient(this.client).subscribe({
      next: (response) => {
        this.router.navigate(['/clients']);
        swal.fire(
          'Success!',
          `Client ${response.name} created successfully`,
          'success'
        );
      },
      error: (err) => {
        this.errors = err.error.payload as string[];
        console.error('Backend error ' + err.status);
        console.error(err.error.payload);
      },
    });
  }

  public update(): void {
    this.clientService.updateClient(this.client).subscribe({
      next: (client) => {
        this.client = client;
        this.router.navigate(['/clients']);
        swal.fire(
          'Success!',
          `Client ${client.name} updated successfully`,
          'success'
        );
      },
      error: (err) => {
        this.errors = err.error.payload as string[];
        console.error('Backend error ' + err.status);
        console.error(err.error.payload);
      },
    });
  }

  public cancel(): void {
    this.router.navigate(['/clients']);
  }
}
