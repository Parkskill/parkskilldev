import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'searcy-by-category',
	templateUrl: './searcy-by-category.component.html',
	styleUrls: [ './searcy-by-category.component.scss' ]
})
export class SearcyByCategoryComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	searchItems = [
		{
			title: 'Search By',
			button: {
				name: 'Shop by collection',
				link: '/TilesCollections'
			},
			image: '/assets/images/search-by-catergory/collection.jpg'
		},
		{
			title: 'Search By',
			button: {
				name: 'Shop by Color',
				link: '/TileSearch'
			},
			image: '/assets/images/search-by-catergory/color.png'
		},
		{
			title: 'Search By',
			button: {
				name: 'Shop by Type',
				link: '/TileSearch'
			},
			image: '/assets/images/search-by-catergory/type.png'
		},
		{
			title: 'Search By',
			button: {
				name: 'Shop by Look',
				link: '/TileSearch'
			},
			image: '/assets/images/search-by-catergory/look.jpg'
		},
		{
			title: 'Search By',
			button: {
				name: 'Shop by Size',
				link: '/TileSearch'
			},
			image: '/assets/images/search-by-catergory/size.png'
		},
		{
			title: 'Search By',
			button: {
				name: 'Shop by Shape',
				link: '/TileSearch'
			},
			image: '/assets/images/search-by-catergory/shape.png'
		}
	];
}
