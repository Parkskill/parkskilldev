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
				link: '/TileSearch?vocabulary=Tiles collection'
			},
			image: '/assets/images/search-by-catergory/collection.jpg'
		},
		{
			title: 'Search By',
			button: {
				name: 'Shop by Color',
				link: '/TileSearch?vocabulary=Color'
			},
			image: '/assets/images/search-by-catergory/color.png'
		},
		{
			title: 'Search By',
			button: {
				name: 'Shop by Type',
				link: '/TileSearch?vocabulary=Type'
			},
			image: '/assets/images/search-by-catergory/type.png'
		},
		{
			title: 'Search By',
			button: {
				name: 'Shop by Look',
				link: '/TileSearch?vocabulary=Look type'
			},
			image: '/assets/images/search-by-catergory/look.jpg'
		},
		{
			title: 'Search By',
			button: {
				name: 'Shop by Size',
				link: '/TileSearch?vocabulary=Size'
			},
			image: '/assets/images/search-by-catergory/size.png'
		},
		{
			title: 'Search By',
			button: {
				name: 'Shop by Shape',
				link: '/TileSearch?vocabulary=Shape'
			},
			image: '/assets/images/search-by-catergory/shape.png'
		}
	];
}
