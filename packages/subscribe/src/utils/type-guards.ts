import { ContactItem, SocialItem, FooterBlock } from '../types';

type ContactBlock = FooterBlock<ContactItem>;
type SocialBlock = FooterBlock<SocialItem>;
type AnyBlock = ContactBlock | SocialBlock;

export const isSocialFooterBlock = (data: AnyBlock): data is SocialBlock =>
    typeof data === 'object'
    && data !== null
    && 'items' in data
    && Array.isArray(data.items)
    && data.items.length > 0
    && 'icon' in data.items[0]
    && 'link' in data.items[0];

export const isContactFooterBlock = (data: AnyBlock): data is ContactBlock =>
    !isSocialFooterBlock(data);
