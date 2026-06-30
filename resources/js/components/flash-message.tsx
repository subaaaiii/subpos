import { usePage } from '@inertiajs/react';
import type { PageProps as InertiaPageProps } from '@inertiajs/core';

interface SharedPageProps extends InertiaPageProps {
    flash: {
        success?: string;
        error?: string;
    };
}

export default function FlashMessage() {
    const { flash } = usePage<SharedPageProps>().props;

    return (
        <>
            {flash.success && <div>{flash.success}</div>}
            {flash.error && <div>{flash.error}</div>}
        </>
    );
}
