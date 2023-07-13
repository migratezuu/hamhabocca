/*global kakao*/
import React, { useEffect } from 'react'

const Kakaomap = (address) => {

    useEffect(() => {
        let mapContainer = document.getElementById('map'), // 지도를 표시할 div
            mapOption = {
                center: new kakao.maps.LatLng(37.56682, 126.97865), // 지도의 중심좌표
                level: 10, // 지도의 확대 레벨
                mapTypeId: kakao.maps.MapTypeId.ROADMAP // 지도종류
            };

        // 지도를 생성한다 
        var map = new kakao.maps.Map(mapContainer, mapOption);

        // 출발 마커 이미지를 생성합니다
        var startSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png', // 출발 마커이미지의 주소입니다    
            startSize = new kakao.maps.Size(50, 45), // 출발 마커이미지의 크기입니다 
            startOption = {
                offset: new kakao.maps.Point(15, 43) // 출발 마커이미지에서 마커의 좌표에 일치시킬 좌표를 설정합니다 (기본값은 이미지의 가운데 아래입니다)
            };

        var startImage = new kakao.maps.MarkerImage(startSrc, startSize, startOption);

        // 도착 마커 이미지를 생성합니다
        var arriveSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png', // 도착 마커이미지 주소입니다    
            arriveSize = new kakao.maps.Size(50, 45), // 도착 마커이미지의 크기입니다 
            arriveOption = {
                offset: new kakao.maps.Point(15, 43) // 도착 마커이미지에서 마커의 좌표에 일치시킬 좌표를 설정합니다 (기본값은 이미지의 가운데 아래입니다)
            };

        var arriveImage = new kakao.maps.MarkerImage(arriveSrc, arriveSize, arriveOption);

        // 주소-좌표 변환 객체를 생성합니다
        let startGeocoder = new kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다
        startGeocoder.addressSearch(address.departureAddress, function (result, status) {

            // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) {

                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                // 결과값으로 받은 위치를 출발 마커로 표시합니다
                var startMarker = new kakao.maps.Marker({
                    map: map, // 출발 마커가 지도 위에 표시되도록 설정합니다
                    position: coords,
                    image: startImage // 출발 마커이미지를 설정합니다
                });

                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            }
        });

        // 주소-좌표 변환 객체를 생성합니다
        let arriveGeocoder = new kakao.maps.services.Geocoder(); 

        // 주소로 좌표를 검색합니다
        arriveGeocoder.addressSearch(address.arrivalAddress, function (result, status) {

            // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) {

                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                // 도착 마커를 생성합니다 
                var arriveMarker = new kakao.maps.Marker({
                    map: map, // 도착 마커가 지도 위에 표시되도록 설정합니다
                    position: coords,
                    image: arriveImage // 도착 마커이미지를 설정합니다
                });
            }
        });
        
    
    }, [address])


    return (
        <div style={{ zIndex: '1' }}>
            <div id="map" style={{ width: "405px", height: "400px" }}></div>

        </div>
    )
}

export default Kakaomap;