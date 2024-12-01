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
			title: 'Look our collections',
			button: {
				name: 'View',
				link: '/TilesCollections'
			},
			image: '/assets/images/search-by-catergory/collection.jpg'
		},
		{
			title: 'Choose your desired tile color',
			button: {
				name: 'Search by color',
				link: '/CollectionGallerySearch'
			},
			image: '/assets/images/search-by-catergory/color.png'
		},
		{
			title: 'Choose your tile by type',
			button: {
				name: 'Search by type',
				link: '/CollectionGallerySearch'
			},
			image: '/assets/images/search-by-catergory/type.png'
		},
		{
			title: 'Hard to select look type?',
			button: {
				name: 'Search by look',
				link: '/CollectionGallerySearch'
			},
			image: '/assets/images/search-by-catergory/look.jpg'
		},
		{
			title: 'Unable find right size?',
			button: {
				name: 'Shop here',
				link: '/CollectionGallerySearch'
			},
			image: '/assets/images/search-by-catergory/size.png'
		},
		{
			title: 'View our tile shapes',
			button: {
				name: 'Search here',
				link: '/CollectionGallerySearch'
			},
			image: '/assets/images/search-by-catergory/shape.png'
		}
	];
}
