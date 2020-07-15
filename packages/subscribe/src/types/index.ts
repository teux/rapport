interface Dimensions {
    width: number;
    height: number;
}

interface ImageDescriptor {
    dimensions: Dimensions;
    alt: string | null;
    copyright: string | null;
    url: string;
}

export type Image<Dimension extends string = ''> = ImageDescriptor &
{
    [key in Dimension]: ImageDescriptor;
};

export interface Span {
    start: number;
    end: number;
    type: string;
}

export interface RichText {
    type: string | null;
    text: string | null;
    spans: Span[];
}

export interface Tab {
    icon: Image | null;
    header: RichText[];
    text: string | null;
}

interface Slice {
    items: Record<string, string>[];
    primary: {
        button: string | null;
        photo: Image | null;
        text: string | null;
        title1: RichText[];
    };
    slice_label: string | null;
}

export interface Main {
    application: Image<'small'> | null;
    background: Image<'small'> | null;
    description: string | null;
    email_placeholder: string | null;
    logo: Image | null;
    slogan: string | null;
    subscribe_button: string | null;
    subscribe_complete: string | null;
    title: RichText[];
}

export interface Body {
    header: RichText[];
    slice: Slice[];
    tab: Tab[];
}

export interface SocialItem {
    icon: ImageDescriptor;
    link: {
        link_type: 'Web';
        url: string | null;
        target: string;
    };
}

export type ContactItem = Record<'text', string>;

export interface FooterBlock<T> {
    items: T[];
    primary: {
        icon: ImageDescriptor | null;
        label?: string | null;
    };
}

export interface Footer {
    footer: Array<FooterBlock<SocialItem> | FooterBlock<ContactItem>>;
    copyright: string | null;
    rights: string | null;
}

export interface Popup {
    popup_image: ImageDescriptor;
    popup_background: ImageDescriptor;
    disclamer: string | null;
    button_yes: string | null;
    button_no: string | null;
}

export interface Other {
    gradient_left_color: string | null;
    gradient_right_color: string | null;
    head_title: string | null;
    locale: Image | null;
    preloader: Image | null;
}

export interface Subscription {
    data: Main & Body & Footer & Popup & Other;
    lang: 'ru' | 'en-us';
}
