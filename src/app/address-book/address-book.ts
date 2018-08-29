import {ChangeDetectorRef, Component} from '@angular/core';
import {IonicPage, NavController, PopoverController} from 'ionic-angular';
import * as _ from 'lodash';
import {ChatService} from "../chat/chat.service";

@IonicPage()
@Component({
    selector: 'page-address-book',
    templateUrl: 'address-book.html',
})
export class AddressBookPage {
    breeds: any;
    currentPageClass = this;
    alphaScrollItemTemplate: string = `
    <ion-item (click)="currentPageClass.onItemClick(item)">
      {{item.name}}
    </ion-item>
  `;
    triggerAlphaScrollChange: number = 0;

    constructor(private chatService: ChatService,
                public popoverCtrl: PopoverController) {
        this.assignBreeds();
    }

    onItemClick(item) {
        // This is an example of how you could manually trigger ngOnChange
        // for the component. If you modify "listData" it won't perform
        // an ngOnChange, you will have to trigger manually to refresh the component.
        this.triggerAlphaScrollChange++;
    }

    async assignBreeds() {
        const res = await this.chatService.getFriends();
        console.log(res, '~~~~');
        this.breeds = [
            {
                "name": "Affenpinscher"
            },
            {
                "name": "Afghan Hound"
            },
            {
                "name": "Airedale Terrier"
            },
            {
                "name": "Akbash"
            },
            {
                "name": "Akita"
            },
            {
                "name": "Alaskan Malamute"
            },
            {
                "name": "American Bulldog"
            },
            {
                "name": "American Eskimo Dog"
            },
            {
                "name": "American Hairless Terrier"
            },
            {
                "name": "American Staffordshire Terrier"
            },
            {
                "name": "American Water Spaniel"
            },
            {
                "name": "Anatolian Shepherd"
            },
            {
                "name": "Appenzell Mountain Dog"
            },
            {
                "name": "Australian Cattle Dog (Blue Heeler)"
            },
            {
                "name": "Australian Kelpie"
            },
            {
                "name": "Australian Shepherd"
            },
            {
                "name": "Australian Terrier"
            },
            {
                "name": "Basenji"
            },
            {
                "name": "Basset Hound"
            },
            {
                "name": "Beagle"
            },
            {
                "name": "Bearded Collie"
            },
            {
                "name": "Beauceron"
            },
            {
                "name": "Bedlington Terrier"
            },
            {
                "name": "Belgian Shepherd Dog Sheepdog"
            },
            {
                "name": "Belgian Shepherd Laekenois"
            },
            {
                "name": "Belgian Shepherd Malinois"
            },
            {
                "name": "Belgian Shepherd Tervuren"
            },
            {
                "name": "Bernese Mountain Dog"
            },
            {
                "name": "Bichon Frise"
            },
            {
                "name": "Black and Tan Coonhound"
            },
            {
                "name": "Black Labrador Retriever"
            },
            {
                "name": "Black Mouth Cur"
            },
            {
                "name": "Black Russian Terrier"
            },
            {
                "name": "Bloodhound"
            },
            {
                "name": "Blue Lacy"
            },
            {
                "name": "Bluetick Coonhound"
            },
            {
                "name": "Boerboel"
            },
            {
                "name": "Bolognese"
            },
            {
                "name": "Border Collie"
            },
            {
                "name": "Border Terrier"
            },
            {
                "name": "Borzoi"
            },
            {
                "name": "Boston Terrier"
            },
            {
                "name": "Bouvier des Flanders"
            },
            {
                "name": "Boxer"
            },
            {
                "name": "Boykin Spaniel"
            },
            {
                "name": "Briard"
            },
            {
                "name": "Brittany Spaniel"
            },
            {
                "name": "Brussels Griffon"
            },
            {
                "name": "Bull Terrier"
            },
            {
                "name": "Bullmastiff"
            },
            {
                "name": "Cairn Terrier"
            },
            {
                "name": "Canaan Dog"
            },
            {
                "name": "Cane Corso Mastiff"
            },
            {
                "name": "Carolina Dog"
            },
            {
                "name": "Catahoula Leopard Dog"
            },
            {
                "name": "Cattle Dog"
            },
            {
                "name": "Caucasian Sheepdog (Caucasian Ovtcharka)"
            },
            {
                "name": "Cavalier King Charles Spaniel"
            },
            {
                "name": "Chesapeake Bay Retriever"
            },
            {
                "name": "Chihuahua"
            },
            {
                "name": "Chinese Crested Dog"
            },
            {
                "name": "Chinese Foo Dog"
            },
            {
                "name": "Chinook"
            },
            {
                "name": "Chocolate Labrador Retriever"
            },
            {
                "name": "Chow Chow"
            },
            {
                "name": "Cirneco dell'Etna"
            },
            {
                "name": "Clumber Spaniel"
            },
            {
                "name": "Cockapoo"
            },
            {
                "name": "Cocker Spaniel"
            },
            {
                "name": "Collie"
            },
            {
                "name": "Coonhound"
            },
            {
                "name": "Corgi"
            },
            {
                "name": "Coton de Tulear"
            },
            {
                "name": "Curly-Coated Retriever"
            },
            {
                "name": "Dachshund"
            },
            {
                "name": "Dalmatian"
            },
            {
                "name": "Dandi Dinmont Terrier"
            },
            {
                "name": "Doberman Pinscher"
            },
            {
                "name": "Dogo Argentino"
            },
            {
                "name": "Dogue de Bordeaux"
            },
            {
                "name": "Dutch Shepherd"
            },
            {
                "name": "English Bulldog"
            },
            {
                "name": "English Cocker Spaniel"
            },
            {
                "name": "English Coonhound"
            },
            {
                "name": "English Pointer"
            },
            {
                "name": "English Setter"
            },
            {
                "name": "English Shepherd"
            },
            {
                "name": "English Springer Spaniel"
            },
            {
                "name": "English Toy Spaniel"
            },
            {
                "name": "Entlebucher"
            },
            {
                "name": "Eskimo Dog"
            },
            {
                "name": "Feist"
            },
            {
                "name": "Field Spaniel"
            },
            {
                "name": "Fila Brasileiro"
            },
            {
                "name": "Finnish Lapphund"
            },
            {
                "name": "Finnish Spitz"
            },
            {
                "name": "Flat-coated Retriever"
            },
            {
                "name": "Fox Terrier"
            },
            {
                "name": "Foxhound"
            },
            {
                "name": "French Bulldog"
            },
            {
                "name": "Galgo Spanish Greyhound"
            },
            {
                "name": "German Pinscher"
            },
            {
                "name": "German Shepherd Dog"
            },
            {
                "name": "German Shorthaired Pointer"
            },
            {
                "name": "German Spitz"
            },
            {
                "name": "German Wirehaired Pointer"
            },
            {
                "name": "Giant Schnauzer"
            },
            {
                "name": "Glen of Imaal Terrier"
            },
            {
                "name": "Golden Retriever"
            },
            {
                "name": "Gordon Setter"
            },
            {
                "name": "Great Dane"
            },
            {
                "name": "Great Pyrenees"
            },
            {
                "name": "Greater Swiss Mountain Dog"
            },
            {
                "name": "Greyhound"
            },
            {
                "name": "Harrier"
            },
            {
                "name": "Havanese"
            },
            {
                "name": "Hound"
            },
            {
                "name": "Hovawart"
            },
            {
                "name": "Husky"
            },
            {
                "name": "Ibizan Hound"
            },
            {
                "name": "Icelandic Sheepdog"
            },
            {
                "name": "Illyrian Sheepdog"
            },
            {
                "name": "Irish Setter"
            },
            {
                "name": "Irish Terrier"
            },
            {
                "name": "Irish Water Spaniel"
            },
            {
                "name": "Irish Wolfhound"
            },
            {
                "name": "Italian Greyhound"
            },
            {
                "name": "Italian Spinone"
            },
            {
                "name": "Jack Russell Terrier"
            },
            {
                "name": "Jack Russell Terrier (Parson Russell Terrier)"
            },
            {
                "name": "Japanese Chin"
            },
            {
                "name": "Jindo"
            },
            {
                "name": "Kai Dog"
            },
            {
                "name": "Karelian Bear Dog"
            },
            {
                "name": "Keeshond"
            },
            {
                "name": "Kerry Blue Terrier"
            },
            {
                "name": "Kishu"
            },
            {
                "name": "Klee Kai"
            },
            {
                "name": "Komondor"
            },
            {
                "name": "Kuvasz"
            },
            {
                "name": "Kyi Leo"
            },
            {
                "name": "Labrador Retriever"
            },
            {
                "name": "Lakeland Terrier"
            },
            {
                "name": "Lancashire Heeler"
            },
            {
                "name": "Leonberger"
            },
            {
                "name": "Lhasa Apso"
            },
            {
                "name": "Lowchen"
            },
            {
                "name": "Maltese"
            },
            {
                "name": "Manchester Terrier"
            },
            {
                "name": "Maremma Sheepdog"
            },
            {
                "name": "Mastiff"
            },
            {
                "name": "McNab"
            },
            {
                "name": "Miniature Pinscher"
            },
            {
                "name": "Mountain Cur"
            },
            {
                "name": "Mountain Dog"
            },
            {
                "name": "Munsterlander"
            },
            {
                "name": "Neapolitan Mastiff"
            },
            {
                "name": "New Guinea Singing Dog"
            },
            {
                "name": "Newfoundland Dog"
            },
            {
                "name": "Norfolk Terrier"
            },
            {
                "name": "Norwegian Buhund"
            },
            {
                "name": "Norwegian Elkhound"
            },
            {
                "name": "Norwegian Lundehund"
            },
            {
                "name": "Norwich Terrier"
            },
            {
                "name": "Nova Scotia Duck-Tolling Retriever"
            },
            {
                "name": "Old English Sheepdog"
            },
            {
                "name": "Otterhound"
            },
            {
                "name": "Papillon"
            },
            {
                "name": "Patterdale Terrier (Fell Terrier)"
            },
            {
                "name": "Pekingese"
            },
            {
                "name": "Peruvian Inca Orchid"
            },
            {
                "name": "Petit Basset Griffon Vendeen"
            },
            {
                "name": "Pharaoh Hound"
            },
            {
                "name": "Pit Bull Terrier"
            },
            {
                "name": "Plott Hound"
            },
            {
                "name": "Podengo Portugueso"
            },
            {
                "name": "Pointer"
            },
            {
                "name": "Polish Lowland Sheepdog"
            },
            {
                "name": "Pomeranian"
            },
            {
                "name": "Poodle"
            },
            {
                "name": "Portuguese Water Dog"
            },
            {
                "name": "Presa Canario"
            },
            {
                "name": "Pug"
            },
            {
                "name": "Puli"
            },
            {
                "name": "Pumi"
            },
            {
                "name": "Rat Terrier"
            },
            {
                "name": "Redbone Coonhound"
            },
            {
                "name": "Retriever"
            },
            {
                "name": "Rhodesian Ridgeback"
            },
            {
                "name": "Rottweiler"
            },
            {
                "name": "Saint Bernard St. Bernard"
            },
            {
                "name": "Saluki"
            },
            {
                "name": "Samoyed"
            },
            {
                "name": "Sarplaninac"
            },
            {
                "name": "Schipperke"
            },
            {
                "name": "Schnauzer"
            },
            {
                "name": "Scottish Deerhound"
            },
            {
                "name": "Scottish Terrier Scottie"
            },
            {
                "name": "Sealyham Terrier"
            },
            {
                "name": "Setter"
            },
            {
                "name": "Shar Pei"
            },
            {
                "name": "Sheep Dog"
            },
            {
                "name": "Shepherd"
            },
            {
                "name": "Shetland Sheepdog Sheltie"
            },
            {
                "name": "Shiba Inu"
            },
            {
                "name": "Shih Tzu"
            },
            {
                "name": "Siberian Husky"
            },
            {
                "name": "Silky Terrier"
            },
            {
                "name": "Skye Terrier"
            },
            {
                "name": "Sloughi"
            },
            {
                "name": "Smooth Fox Terrier"
            },
            {
                "name": "South Russian Ovtcharka"
            },
            {
                "name": "Spaniel"
            },
            {
                "name": "Spitz"
            },
            {
                "name": "Staffordshire Bull Terrier"
            },
            {
                "name": "Standard Poodle"
            },
            {
                "name": "Sussex Spaniel"
            },
            {
                "name": "Swedish Vallhund"
            },
            {
                "name": "Terrier"
            },
            {
                "name": "Thai Ridgeback"
            },
            {
                "name": "Tibetan Mastiff"
            },
            {
                "name": "Tibetan Spaniel"
            },
            {
                "name": "Tibetan Terrier"
            },
            {
                "name": "Tosa Inu"
            },
            {
                "name": "Toy Fox Terrier"
            },
            {
                "name": "Treeing Walker Coonhound"
            },
            {
                "name": "Vizsla"
            },
            {
                "name": "Weimaraner"
            },
            {
                "name": "Welsh Corgi"
            },
            {
                "name": "Welsh Springer Spaniel"
            },
            {
                "name": "Welsh Terrier"
            },
            {
                "name": "West Highland White Terrier Westie"
            },
            {
                "name": "Wheaten Terrier"
            },
            {
                "name": "Whippet"
            },
            {
                "name": "White German Shepherd"
            },
            {
                "name": "Wire Fox Terrier"
            },
            {
                "name": "Wire-haired Pointing Griffon"
            },
            {
                "name": "Wirehaired Terrier"
            },
            {
                "name": "Xoloitzcuintle (Mexican Hairless)"
            },
            {
                "name": "Yellow Labrador Retriever"
            },
            {
                "name": "Yorkshire Terrier Yorkie"
            }
        ]
    }

    addFriends(myEvent) {
        const popover = this.popoverCtrl.create(
            'PopoverPage',
            {
                data: [
                    {
                        page: 'AddFriendsPage',
                        name: 'AddFriendsPage'
                    }
                ]
            });
        popover.present({ev: myEvent});
    }

    // ...

}
