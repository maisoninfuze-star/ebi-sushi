/**
 * Contenu éditorial — français.
 *
 * Tout le texte visible du site est centralisé ici. Pour ajouter l'anglais ou
 * l'arabe : dupliquer ce fichier (en.ts / ar.ts), traduire les valeurs, puis
 * activer la langue dans src/config/site.ts. Aucun composant n'a besoin d'être
 * modifié — ils lisent tous ce dictionnaire.
 */
export const fr = {
  nav: {
    order: "Commander",
    cart: "Panier",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    language: "Langue",
    skipToContent: "Aller au contenu principal",
  },

  hero: {
    eyebrow: "El Jadida · Cuisine japonaise contemporaine",
    title: "L'art du sushi, signé Ebi.",
    description:
      "Une expérience japonaise contemporaine au cœur d'El Jadida. Des créations précises, des produits frais et une présentation qui éveille les sens.",
    primaryCta: "Commander maintenant",
    secondaryCta: "Réserver une table",
    scroll: "Découvrir",
    /** Accent typographique vertical — « ebi » (la crevette) en japonais. */
    accent: "海老",
    /** Nom de marque affiché en grand sur le panneau photo, sur deux lignes. */
    wordmark: ["Ebi", "Sushi"],
    carousel: {
      label: "Nos plats à la carte",
      cardCta: "Voir la carte",
      previous: "Plat précédent",
      next: "Plat suivant",
      goTo: (n: number, name: string) => `Afficher le plat ${n} : ${name}`,
      status: (n: number, total: number, name: string) => `Plat ${n} sur ${total} : ${name}`,
      pause: "Mettre le défilement en pause",
      play: "Reprendre le défilement",
    },
  },

  services: {
    title: "Nos services",
    items: [
      { label: "Sur place", description: "Une salle intime, pensée pour prendre son temps." },
      { label: "Livraison", description: "Vos créations préférées, jusque chez vous." },
      { label: "À emporter", description: "Préparé à la commande, prêt à l'heure dite." },
      { label: "Réservation", description: "Votre table réservée en quelques secondes." },
    ],
  },

  signatures: {
    eyebrow: "Nos créations",
    title: "Chaque pièce, un équilibre.",
    description:
      "Des associations généreuses, des textures maîtrisées et une sélection préparée à la commande.",
    sectionTitle: "Nos signatures",
    add: "Ajouter",
    added: "Ajouté",
    viewAll: "Voir toute la carte",
    swipeHint: "Faites glisser pour découvrir",
  },

  story: {
    eyebrow: "Notre univers",
    title: "La précision dans chaque geste.",
    text: "Chez Ebi Sushi, chaque création naît d'un équilibre entre fraîcheur, technique et créativité. Une cuisine contemporaine conçue pour être partagée, découverte et savourée.",
  },

  experience: {
    eyebrow: "L'expérience",
    title: "Bien plus qu'un repas.",
    description:
      "Une atmosphère chaleureuse, une cuisine expressive et une expérience pensée jusque dans les moindres détails.",
  },

  gallery: {
    eyebrow: "En images",
    title: "L'atmosphère Ebi.",
    open: "Agrandir l'image",
    close: "Fermer",
    previous: "Image précédente",
    next: "Image suivante",
    counter: (current: number, total: number) => `Image ${current} sur ${total}`,
  },

  reservation: {
    eyebrow: "Réservation",
    title: "Votre table vous attend.",
    text: "Réservez votre expérience Ebi Sushi en quelques secondes.",
    cta: "Réserver une table",
    form: {
      guests: "Nombre de convives",
      date: "Date",
      time: "Heure",
      name: "Nom complet",
      phone: "Téléphone",
      occasion: "Occasion",
      occasionPlaceholder: "Anniversaire, dîner d'affaires…",
      note: "Message",
      notePlaceholder: "Une allergie, une table en particulier, une demande…",
      consent:
        "J'accepte que mes informations soient transmises au restaurant pour traiter ma demande.",
      submit: "Envoyer ma demande",
      submitting: "Envoi en cours…",
      guestUnit: (n: number) => (n === 1 ? "1 convive" : `${n} convives`),
      guestMore: "Plus de 12 convives",
      disclaimer:
        "Votre demande est envoyée au restaurant via WhatsApp. Elle n'est confirmée qu'après réponse de l'équipe Ebi Sushi.",
      success: {
        title: "Demande transmise",
        text: "Votre demande de réservation a été préparée et ouverte dans WhatsApp. L'équipe Ebi Sushi vous confirmera la disponibilité par retour de message.",
        again: "Faire une autre demande",
        call: "Ou appeler directement",
      },
      error: {
        title: "L'envoi n'a pas abouti",
        text: "La fenêtre WhatsApp n'a pas pu s'ouvrir. Vous pouvez réessayer ou appeler le restaurant directement.",
        retry: "Réessayer",
      },
      validation: {
        name: "Merci d'indiquer votre nom.",
        nameShort: "Le nom doit contenir au moins 2 caractères.",
        phone: "Merci d'indiquer un numéro de téléphone.",
        phoneInvalid: "Ce numéro ne semble pas valide (au moins 9 chiffres).",
        date: "Merci de choisir une date.",
        datePast: "Merci de choisir une date à venir.",
        time: "Merci de choisir une heure.",
        consent: "Votre accord est nécessaire pour transmettre la demande.",
      },
    },
  },

  menu: {
    eyebrow: "La carte",
    title: "Chaque pièce, un équilibre.",
    description:
      "Des associations généreuses, des textures maîtrisées et une sélection préparée à la commande. Composez votre commande pour la livraison ou à emporter.",
    search: "Rechercher un plat…",
    searchLabel: "Rechercher dans la carte",
    filters: {
      all: "Tout",
      popular: "Populaires",
      vegetarian: "Végétarien",
      spicy: "Épicé",
      signature: "Signatures",
      clear: "Effacer les filtres",
      active: "Filtres actifs",
    },
    results: (n: number) => (n === 1 ? "1 plat" : `${n} plats`),
    noResults: {
      title: "Aucun plat ne correspond",
      text: "Essayez un autre mot-clé ou retirez un filtre.",
      reset: "Réinitialiser la recherche",
    },
    pieces: (n: number) => (n === 1 ? "1 pièce" : `${n} pièces`),
    categoriesLabel: "Catégories de la carte",
    detail: "Voir le détail",
    noteLabel: "Note pour ce plat",
    notePlaceholder: "Sans wasabi, sauce à part…",
    addToCart: "Ajouter au panier",
    addWithPrice: (price: string) => `Ajouter · ${price}`,
    descriptionMissing: "Composition détaillée disponible auprès du restaurant.",
    tags: {
      populaire: "Populaire",
      vegetarien: "Végétarien",
      epice: "Épicé",
      signature: "Signature",
    },
  },

  cart: {
    title: "Votre commande",
    empty: {
      title: "Votre panier est vide",
      text: "Parcourez la carte et composez votre commande.",
      cta: "Voir la carte",
    },
    itemCount: (n: number) => (n === 1 ? "1 article" : `${n} articles`),
    subtotal: "Sous-total",
    subtotalNote: "Frais de livraison éventuels confirmés par le restaurant.",
    remove: "Retirer",
    increase: "Augmenter la quantité",
    decrease: "Diminuer la quantité",
    clear: "Vider le panier",
    close: "Fermer le panier",
    checkout: "Finaliser la commande",
    back: "Retour au panier",
    mode: {
      label: "Mode de commande",
      delivery: "Livraison",
      pickup: "À emporter",
    },
    fields: {
      name: "Nom complet",
      phone: "Téléphone",
      address: "Adresse de livraison",
      addressPlaceholder: "Rue, immeuble, étage, repère…",
      note: "Note de commande",
      notePlaceholder: "Précisions sur la livraison, baguettes en plus…",
    },
    validation: {
      name: "Merci d'indiquer votre nom.",
      phone: "Merci d'indiquer un numéro de téléphone.",
      phoneInvalid: "Ce numéro ne semble pas valide (au moins 9 chiffres).",
      address: "L'adresse est nécessaire pour la livraison.",
    },
    send: "Envoyer la commande",
    sending: "Préparation…",
    disclaimer:
      "Votre commande est envoyée au restaurant via WhatsApp. Elle est confirmée — disponibilité, délai et total — par retour de message.",
    sent: {
      title: "Commande transmise",
      text: "Votre commande a été préparée et ouverte dans WhatsApp. L'équipe Ebi Sushi vous confirmera le délai et le total.",
      newOrder: "Nouvelle commande",
    },
  },

  location: {
    eyebrow: "Nous trouver",
    title: "Retrouvez-nous à El Jadida.",
    addressLabel: "Adresse",
    hoursLabel: "Horaires",
    phoneLabel: "Téléphone",
    directions: "Itinéraire",
    call: "Appeler",
    whatsapp: "WhatsApp",
    reserve: "Réserver",
    mapTitle: "Carte de localisation d'Ebi Sushi, Avenue Mohammed VI, El Jadida",
    hoursUnconfirmed: "Horaires susceptibles d'évoluer — un appel confirme.",
  },

  finalCta: {
    title: "Une envie de sushi?",
    text: "Commandez vos créations préférées pour livraison ou à emporter.",
  },

  footer: {
    statement:
      "Cuisine japonaise contemporaine et fusion asiatique à El Jadida. Préparé à la commande, à savourer sur place, à emporter ou livré.",
    explore: "Explorer",
    services: "Services",
    contact: "Contact",
    follow: "Suivre",
    rights: "Tous droits réservés.",
  },

  mobileBar: {
    call: "Appeler",
    reserve: "Réserver",
    order: "Commander",
  },

  contact: {
    eyebrow: "Contact",
    title: "Retrouvez-nous à El Jadida.",
    description:
      "Sur place, à emporter ou en livraison. L'équipe Ebi Sushi répond à vos questions par téléphone et sur WhatsApp.",
    deliveryPartner: "Également disponible sur",
  },

  privacy: {
    eyebrow: "Informations légales",
    title: "Politique de confidentialité",
  },

  intro: {
    label: "Ouverture du site Ebi Sushi",
    skip: "Cliquer pour passer",
  },

  common: {
    from: "Dès",
    currency: "DH",
    loading: "Chargement…",
    required: "obligatoire",
    optional: "facultatif",
    imageUnavailable: "Visuel à venir",
    error: "Une erreur est survenue.",
  },
} as const;

export type Dictionary = typeof fr;
export const dict = fr;
